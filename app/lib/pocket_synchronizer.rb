# frozen_string_literal: true

class PocketSynchronizer
  PER_PAGE = 100

  def self.create(access_token)
    client = PocketClient.create(access_token)
    new(
      pocket: client,
      converter: RetrievedJsonConverter.new,
      saver: RetrievedDataSaver.new,
      logger: Rails.logger,
    )
  end

  def initialize(pocket:, converter:, saver:, logger:)
    @pocket = pocket
    @converter = converter
    @saver = saver
    @logger = logger
  end

  def synchronize(user)
    return import_all(user, user.bookmarks.count) if user.first_sync_incomplete?

    bookmark = user.bookmarks.order(updated_on_pocket_at: :desc).first
    last_updated_at = bookmark ? bookmark.updated_on_pocket_at : user.created_at
    import_updates(user.id, last_updated_at)
  end

  # This is for a first synchronization. It synchronizes all of the user data.
  def import_all(user, offset = 0)
    @pocket.retrieve_each(PER_PAGE, {
      offset: offset,
      state: 'all',
      detailType: 'complete',
      sort: 'oldest',
    }) do |ret, json|
      ok, message = import_retrieved_data(user.id, ret, json)
      return [ok, message] if !ok
      sleep(0.5)
    end

    user.update!(first_sync: :done)
    [true, nil]
  end

  def import_updates(user_id, last_updated_at)
    @pocket.retrieve_each(PER_PAGE, {
      since: last_updated_at.to_i + 1,
      state: 'all',
      detailType: 'complete',
    }) do |ret, json|
      ok, message = import_retrieved_data(user_id, ret, json)
      return [ok, message] if !ok
      sleep(0.5)
    end

    [true, nil]
  end

  private

  def import_retrieved_data(user_id, ret, json)
    if ret.err?
      @logger.error("failed to retrieve: #{ret}")
      return [false, ret.message]
    end

    if !@converter.empty_items?(json)
      converted = @converter.convert(user_id, json)
      result = @saver.save(user_id, converted)

      if result.any_failure?
        @logger.error("failed to import some records: #{result}")
        return [false, 'failed to import some records']
      end
    end

    [true, nil]
  end
end
