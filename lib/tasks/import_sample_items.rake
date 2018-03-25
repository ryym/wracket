# frozen_string_literal: true

# XXX: The tasks in this namespace are temporary. Should be removed later.
namespace :tmp do
  MY_ACCOUNT_EMAIL = 'ryym.64@gmail.com'

  task import_samples: :environment do
    user = User.find_by!(username: MY_ACCOUNT_EMAIL)
    pocket = PocketClient.create(user.access_token)

    ret = pocket.retrieve(count: 30, state: 'all', detailType: 'complete')
    if ret.err?
      raise "failed to retrieve data. code: #{ret.response.code}"
    end

    converter = RetrievedJsonConverter.new
    converted = converter.convert(user.id, ret.response.body_json)

    saver = RetrievedDataSaver.new
    ret = saver.save(user.id, converted)
    p ret
  end

  task clear_samples: :environment do
    user = User.find_by!(username: MY_ACCOUNT_EMAIL)

    ActiveRecord::Base.transaction do
      entry_ids = user.entries.pluck(:id)
      BookmarkTag.joins(:bookmark).merge(Bookmark.where(user: user)).delete_all
      Bookmark.where(user: user).delete_all
      Image.where(entry_id: entry_ids).delete_all
      Entry.where(id: entry_ids).delete_all
    end
  end
end
