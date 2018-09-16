# frozen_string_literal: true

# Synchronize with Pocket by importing all entrries.
class PocketFirstSyncJob < ApplicationJob
  queue_as :default

  def perform(user)
    raise ArgumentError if !user.is_a?(User)
    return if user.sync_status_done?

    syncer = PocketSynchronizer.create(user.access_token)

    # rubocop:disable Style/AsciiComments
    # 実際に import する前に sync_status を syncing にしてしまうと、
    # import されたデータが DB に登録されるまでの間に /home からのリクエストが
    # 来てしまうかもしれない。
    # syncing の状態でリクエストが来た場合は必ずデータを返せるよう、
    # 最初に 1 回 import した後で syncing にする
    # (Pocket 側にデータが1件もない可能性もあるが、それは問題ない。むしろ
    # 「Pocket にデータがない」状態と「まだ初回同期が始まってない」状態を区別する
    # ために sync_status がある。例えば「bookmarks が空の場合は polling を続ける」
    # としてしまうと、 Pocket にデータがない場合はずっと polling する事になる)。
    # rubocop:enable Style/AsciiComments
    if user.sync_status_not_yet?
      User.transaction do
        syncer.import(user, max_call: 1)
        user.update!(sync_status: :syncing)
      end
    end

    max_call = Rails.env.production? ? 10_000 : 10
    syncer.import(user, offset: user.bookmarks.count, max_call: max_call)

    user.update!(sync_status: :done)
  end
end
