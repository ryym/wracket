class RetrievedDataSaver
  # Saves given converted models.
  # This continues process even if some records were failed to save.
  def save(user_id, converted)
    result = self.class::Result.new

    result.of_entries = import_entries(converted.entries)
    failed_entries = result.of_entries.failed_instances

    result.of_user_entries = import_user_entries(converted.user_entries, failed_entries)

    tags_with_entry_id = converted.tags_with_entry_id
    result.of_tags = import_tags(tags_with_entry_id)

    user_entries = UserEntry.by_user(user_id)
    tags = Tag.by_name(tags_with_entry_id.map(&:name))
    user_entry_tags = make_user_entry_tags(
      user_entries,
      tags,
      tags_with_entry_id,
    )

    result.of_user_entry_tags = import_user_entry_tags(user_entry_tags)

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

  def import_user_entries(user_entries, failed_entries)
    user_entries = select_by_valid_entry_ids(user_entries, failed_entries)
    UserEntry.import(user_entries, on_duplicate_key_ignore: true)
  end

  def import_tags(tags_with_entry_id)
    tags = tags_with_entry_id.map do |twe|
      Tag.new(name: twe.name)
    end
    Tag.import(tags, on_duplicate_key_ignore: true)
  end

  def make_user_entry_tags(user_entries, tags, tags_with_entry_id)
    user_entry_by_entry_id = user_entries.each_with_object({}) do |ue, ues|
      ues[ue.entry_id] = ue
    end

    tags_with_entry_id.each_with_object([]) do |twe, recs|
      ue = user_entry_by_entry_id[twe.entry_id]
      next if ue.nil?
      tag = tags.find { |t| t.name == twe.name }
      recs.push(UserEntryTag.new(user_entry_id: ue.id, tag_id: tag.id))
    end
  end

  def import_user_entry_tags(user_entry_tags)
    UserEntryTag.import(user_entry_tags, on_duplicate_key_ignore: true)
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
    :of_user_entries,
    :of_tags,
    :of_user_entry_tags,
    :of_images,
  )
end
