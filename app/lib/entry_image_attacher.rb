# frozen_string_literal: true

class EntryImageAttacher
  def self.create
    new(
      image_maker: ImageMaker.create,
      http: Http,
    )
  end

  def initialize(image_maker:, http:)
    @image_maker = image_maker
    @http = http
  end

  def attach(record, variant: nil)
    if record.image.nil?
      do_attach(record) if record.attach_tryable?
      return @image_maker.default_thumbnail_url if !record.image
    end

    if variant && !@image_maker.has_variant?(record.image, variant)
      @image_maker.make_variant(record.image, variant)
    end

    @image_maker.url_for(record.image, variant: variant)
  end

  private

  def do_attach(record)
    record.update!(attach_tries: record.attach_tries + 1)

    res = @http.get(record.src)
    if res.success?
      image = make_image(res.body)
      record.update!(image: image)
    end

    record
  end

  def make_image(content)
    io = StringIO.new(content)
    @image_maker.make(io)
  ensure
    io.close
  end
end
