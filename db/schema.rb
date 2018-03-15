# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180314135654) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "entries", force: :cascade do |t|
    t.bigint "resolved_id"
    t.string "url", null: false
    t.string "title", default: "", null: false
    t.string "parsed_title"
    t.string "excerpt"
    t.boolean "is_article"
    t.boolean "is_index"
    t.boolean "has_video"
    t.boolean "has_image"
    t.integer "word_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "images", force: :cascade do |t|
    t.bigint "entry_id", null: false
    t.integer "image_id", null: false
    t.string "src", null: false
    t.integer "width", default: 0, null: false
    t.integer "height", default: 0, null: false
    t.string "credit", default: "", null: false
    t.string "caption", default: "", null: false
    t.index ["entry_id", "src"], name: "index_images_on_entry_id_and_src", unique: true
    t.index ["entry_id"], name: "index_images_on_entry_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "user_entries", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "entry_id", null: false
    t.integer "status", default: 0, null: false
    t.boolean "favorite", default: false, null: false
    t.integer "sort_id"
    t.datetime "added_to_pocket_at", null: false
    t.datetime "updated_on_pocket_at"
    t.datetime "archived_at"
    t.datetime "favorited_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entry_id"], name: "index_user_entries_on_entry_id"
    t.index ["user_id", "entry_id"], name: "index_user_entries_on_user_id_and_entry_id", unique: true
    t.index ["user_id"], name: "index_user_entries_on_user_id"
  end

  create_table "user_entry_tags", force: :cascade do |t|
    t.bigint "user_entry_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id"], name: "index_user_entry_tags_on_tag_id"
    t.index ["user_entry_id", "tag_id"], name: "index_user_entry_tags_on_user_entry_id_and_tag_id", unique: true
    t.index ["user_entry_id"], name: "index_user_entry_tags_on_user_entry_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "access_token", limit: 32, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "entries", "entries", column: "resolved_id"
  add_foreign_key "images", "entries"
  add_foreign_key "user_entries", "entries"
  add_foreign_key "user_entries", "users"
  add_foreign_key "user_entry_tags", "tags"
  add_foreign_key "user_entry_tags", "user_entries"
end
