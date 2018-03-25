# frozen_string_literal: true

class PocketSynchronizer
  def self.create(pocket)
    self.new(
      pocket: pocket,
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
    return [false, "first synchronization is not supported yet"] if user.last_synced_at.nil?

    @pocket.retrieve_each(50, since: user.last_synced_at.to_i, status: 'all') do |retrieved, json|
      if retrieved.err?
        @logger.error("failed to retrieve: #{res.code} [err code: #{res.error_code}] #{res.message}")
        return [false, res.message]
      end

      next if @converter.empty_items?(json)
      converted = @converter.convert(user.id, json)
      result = @saver.save(user.id, converted)

      if result.any_failure?
        @logger.error("failed to import some records: #{result}")
        return [false, "failed to import some records"]
      end
    end

    user.update(last_synced_at: Time.current)

    [true, nil]
  end
end
