class RetrievedDataSaver
  # Saves given converted models.
  # This continues process even if some records were failed to save.
  def save(user_id, converted)
    result = self.class::Result.new

    result.of_entries = import_entries(converted.entries)
    failed_entries = result.of_entries.failed_instances

    result.of_bookmarks = import_bookmarks(converted.bookmarks, failed_entries)

    tags_with_entry_id = converted.tags_with_entry_id
    result.of_tags = import_tags(tags_with_entry_id)

    bookmarks = Bookmark.by_user(user_id)
    tags = Tag.by_name(tags_with_entry_id.map(&:name))
    bookmark_tags = make_bookmark_tags(
      bookmarks,
      tags,
      tags_with_entry_id,
    )

    result.of_bookmark_tags = import_bookmark_tags(bookmark_tags)

    result.of_images = import_images(converted.images, failed_entries)

    result
  end

  def import_entries(entries)
    Entry.import(entries, on_duplicate_key_update: %i[
      resolved_id
      url
      title
      parsed_title
      excerpt
      is_article
      is_index
      has_video
      has_image
      word_count
    ])
  end

  def import_bookmarks(bookmarks, failed_entries)
    bookmarks = select_by_valid_entry_ids(bookmarks, failed_entries)
    Bookmark.import(bookmarks, on_duplicate_key_ignore: true)
  end

  def import_tags(tags_with_entry_id)
    tags = tags_with_entry_id.map do |twe|
      Tag.new(name: twe.name)
    end
    Tag.import(tags, on_duplicate_key_ignore: true)
  end

  def make_bookmark_tags(bookmarks, tags, tags_with_entry_id)
    bookmark_by_entry_id = bookmarks.each_with_object({}) do |ue, ues|
      ues[ue.entry_id] = ue
    end

    tags_with_entry_id.each_with_object([]) do |twe, recs|
      ue = bookmark_by_entry_id[twe.entry_id]
      next if ue.nil?
      tag = tags.find { |t| t.name == twe.name }
      recs.push(BookmarkTag.new(bookmark_id: ue.id, tag_id: tag.id))
    end
  end

  def import_bookmark_tags(bookmark_tags)
    BookmarkTag.import(bookmark_tags, on_duplicate_key_ignore: true)
  end

  def import_images(images, failed_entries)
    images = select_by_valid_entry_ids(images, failed_entries)
    Image.import(images, on_duplicate_key_ignore: true)
  end

  def select_by_valid_entry_ids(records, failed_entries)
    return records if failed_entries.empty?
    records.reject do |rec|
      failed_entries.any? { |e| e.id == rec.entry_id }
    end
  end
end

class RetrievedDataSaver
  # XXX: Should be readonly.
  Result = Struct.new(
    :of_entries,
    :of_bookmarks,
    :of_tags,
    :of_bookmark_tags,
    :of_images,
  )
end