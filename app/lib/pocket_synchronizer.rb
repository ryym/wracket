# frozen_string_literal: true

class PocketSynchronizer
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

  def import_updates(user)
    return [false, 'first synchronization is not supported yet'] if user.last_synced_at.nil?

    @pocket.retrieve_each(50, {
      since: user.last_synced_at.to_i,
      state: 'all',
      detailType: 'complete',
    }) do |ret, json|
      if ret.err?
        @logger.error(<<~MSG)
          failed to retrieve: #{ret.response.code} [err code: #{ret.error_code}] #{ret.message}
        MSG
        return [false, ret.message]
      end

      next if @converter.empty_items?(json)
      converted = @converter.convert(user.id, json)
      result = @saver.save(user.id, converted)

      if result.any_failure?
        @logger.error("failed to import some records: #{result}")
        return [false, 'failed to import some records']
      end

      sleep(0.5)
    end

    user.update(last_synced_at: Time.current)

    [true, nil]
  end
end
