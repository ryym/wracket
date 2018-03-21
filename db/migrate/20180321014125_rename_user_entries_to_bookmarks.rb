class RenameUserEntriesToBookmarks < ActiveRecord::Migration[5.1]
  def change
    rename_column :user_entry_tags, :user_entry_id, :bookmark_id
    rename_table :user_entry_tags, :bookmark_tags
    rename_table :user_entries, :bookmarks
  end
end
