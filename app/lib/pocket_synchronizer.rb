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

  def import_updates_since(last_updated, user)
    @pocket.retrieve_each(50, since: last_updated.to_i, status: 'all') do |retrieved, json|
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

    [true, nil]
  end
end
