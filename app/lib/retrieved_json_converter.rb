# frozen_string_literal: true

class RetrievedJsonConverter
  def convert(user_id, json)
    return self.class::Result.new if empty_items?(json)

    items_by_id = json.fetch('list')
    retrieved_entry_ids = Set.new(items_by_id.keys.map(&:to_i))

    result = self.class::Result.new
    items_by_id.each do |id, item|
      append_results(user_id, id.to_i, item, retrieved_entry_ids, result)
    end
    result
  end

  def empty_items?(json)
    # NOTE: If no data exist, Pocket sets an empty array to 'list' instead of an empty object!
    json['list'].empty?
  end

  def append_results(user_id, id, item, retrieved_entry_ids, result)
    if item['status'].to_i == Bookmark.statuses[:deleted]
      result.deleted_bookmarks.push(Bookmark.new(user_id: user_id, entry_id: id))
      return
    end

    result.entries.push(*build_entries(id, item, retrieved_entry_ids))
    result.bookmarks.push(build_bookmark(user_id, id, item))

    tags_with_entry_id = build_tags_with_entry_id(id, item.fetch('tags', {}))
    result.tags_with_entry_id.push(*tags_with_entry_id)

    images = build_images(id, item.fetch('images', {}))
    result.images.push(*images)
  end

  def build_entries(id, item, retrieved_ids)
    resolved_id = item['resolved_id'].to_i

    # Do not be processed yet or could not resolve.
    if resolved_id == 0
      return [
        Entry.new(
          id: id,
          url: item['given_url'],
          title: item['given_title'],
        ),
      ]
    end

    common_attrs = item.slice(
      'excerpt',
      'is_article',
      'is_index',
      'has_video',
      'has_image',
      'word_count',
    )
    common_attrs[:title] = item['given_title']
    common_attrs[:parsed_title] = item['resolved_title']

    if id == resolved_id
      return [
        Entry.new(common_attrs.merge(
          id: id,
          resolved_id: id,
          url: item['given_url'],
        )),
      ]
    end

    entries = [
      Entry.new(
        id: id,
        resolved_id: resolved_id,
        url: item['given_url'],
        title: item['given_title'],
      ),
    ]

    # Avoid creating duplicate entries.
    if !retrieved_ids.include?(resolved_id)
      entries.push(
        Entry.new(common_attrs.merge(
          id: resolved_id,
          resolved_id: resolved_id,
          url: item['resolved_url'],
        )),
      )
    end

    entries
  end

  def build_bookmark(user_id, entry_id, item)
    Bookmark.new(
      user_id: user_id,
      entry_id: entry_id,
      status: item['status'].to_i,
      favorite: item['favorite'] == '1',
      sort_id: item['sort_id'].to_i,
      added_to_pocket_at: utc_time(item['time_added']),
      updated_on_pocket_at: utc_time(item['time_updated']),
      archived_at: utc_time(item['time_read']),
      favorited_at: utc_time(item['time_favorited']),
    )
  end

  def utc_time(stamp)
    stamp == '0' ? nil : Time.zone.at(stamp.to_i).utc
  end

  def build_tags_with_entry_id(entry_id, tag_by_name)
    tag_by_name.keys.map do |name|
      TagWithEntryId.new(entry_id, name)
    end
  end

  def build_images(entry_id, image_by_id)
    image_by_id.values.map do |image|
      Image.new(
        entry_id: entry_id,
        image_id: image['image_id'],
        src: image['src'],
        width: image['width'].to_i,
        height: image['height'].to_i,
        credit: image['credit'],
        caption: image['caption'],
      )
    end
  end
end

class RetrievedJsonConverter
  class Result
    # XXX: Should be readonly.
    attr_accessor :entries
    attr_accessor :bookmarks
    attr_accessor :deleted_bookmarks
    attr_accessor :tags_with_entry_id
    attr_accessor :images

    def initialize
      self.entries = []
      self.bookmarks = []
      self.deleted_bookmarks = []
      self.tags_with_entry_id = []
      self.images = []
    end
  end

  TagWithEntryId = Struct.new(:entry_id, :name)
end
