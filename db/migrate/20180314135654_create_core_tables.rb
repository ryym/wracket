# Create core tables to store data retrieved from Pocket.
class CreateCoreTables < ActiveRecord::Migration[5.1]
  def change
    create_table :entries do |t|
      t.bigint :resolved_id
      t.string :url, null: false
      t.string :title, null: false, default: ''
      t.string :parsed_title
      t.string :excerpt
      t.boolean :is_article
      t.boolean :is_index
      t.boolean :has_video
      t.boolean :has_image
      t.integer :word_count

      t.timestamps
    end
    add_foreign_key :entries, :entries, column: :resolved_id, primary_key: :id

    create_table :user_entries do |t|
      t.references :user, null: false, index: true, foreign_key: true
      t.references :entry, null: false, foreign_key: true
      t.integer :status, limit: 4, null: false, default: 0
      t.boolean :favorite, null: false, default: false
      t.integer :sort_id
      t.datetime :added_to_pocket_at, null: false
      t.datetime :updated_on_pocket_at
      t.datetime :archived_at
      t.datetime :favorited_at

      t.timestamps
    end
    add_index :user_entries, %i[user_id entry_id], unique: true

    create_table :tags do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :tags, :name, unique: true

    create_table :user_entry_tags do |t|
      t.references :user_entry, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
    add_index :user_entry_tags, %i[user_entry_id tag_id], unique: true

    create_table :images do |t|
      t.references :entry, null: false, index: true, foreign_key: true
      t.integer :image_id, null: false
      t.string :src, null: false
      t.integer :width, null: false, default: 0
      t.integer :height, null: false, default: 0
      t.string :credit, null: false, default: ''
      t.string :caption, null: false, default: ''
    end
    add_index :images, %i[entry_id src], unique: true
  end
end
