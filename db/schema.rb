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

ActiveRecord::Schema.define(version: 2018_09_16_025924) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookmark_tags", force: :cascade do |t|
    t.bigint "bookmark_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bookmark_id", "tag_id"], name: "index_bookmark_tags_on_bookmark_id_and_tag_id", unique: true
    t.index ["bookmark_id"], name: "index_bookmark_tags_on_bookmark_id"
    t.index ["tag_id"], name: "index_bookmark_tags_on_tag_id"
  end

  create_table "bookmarks", force: :cascade do |t|
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
    t.datetime "opened_at"
    t.index ["entry_id"], name: "index_bookmarks_on_entry_id"
    t.index ["user_id", "entry_id"], name: "index_bookmarks_on_user_id_and_entry_id", unique: true
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

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

  create_table "entry_images", force: :cascade do |t|
    t.bigint "entry_id", null: false
    t.integer "pocket_image_id", null: false
    t.string "src", null: false
    t.integer "width", default: 0, null: false
    t.integer "height", default: 0, null: false
    t.string "credit", default: "", null: false
    t.string "caption", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "image_id"
    t.integer "attach_tries", default: 0, null: false
    t.index ["entry_id", "src"], name: "index_entry_images_on_entry_id_and_src", unique: true
    t.index ["entry_id"], name: "index_entry_images_on_entry_id"
    t.index ["image_id"], name: "index_entry_images_on_image_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "digest", null: false
    t.string "content_type"
    t.json "variants", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "transform_tries", default: 0, null: false
    t.index ["digest"], name: "index_images_on_digest"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "session_id", null: false
    t.text "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true
    t.index ["updated_at"], name: "index_sessions_on_updated_at"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "access_token", limit: 32, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_synced_at"
    t.integer "sync_status", default: 0, null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "bookmark_tags", "bookmarks"
  add_foreign_key "bookmark_tags", "tags"
  add_foreign_key "bookmarks", "entries"
  add_foreign_key "bookmarks", "users"
  add_foreign_key "entries", "entries", column: "resolved_id"
  add_foreign_key "entry_images", "entries"
  add_foreign_key "entry_images", "images"
end
