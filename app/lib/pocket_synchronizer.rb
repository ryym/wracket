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
    return import_all(user, user.bookmarks.count) if !user.first_sync_done?

    ok, message = import_updates(user.id, user.last_synced_at)
    user.update!(last_synced_at: Time.current) if ok
    [ok, message]
  end

  # This is for a first synchronization. It synchronizes all of the user data.
  def import(user, offset: 0, max_call: 1000)
    @pocket.retrieve_each(
      PER_PAGE,
      {
        offset: offset,
        state: 'all',
        detailType: 'complete',
        sort: 'newest',
      },
      max_call: max_call,
    ) do |ret, json|
      ok, message = import_retrieved_data(user.id, ret, json)
      return [ok, message] if !ok
      sleep(0.5)
    end

    user.update!(last_synced_at: Time.current)
    [true, nil]
  end

  def import_updates(user_id, last_synced_at)
    @pocket.retrieve_each(PER_PAGE, {
      since: last_synced_at.to_i,
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
