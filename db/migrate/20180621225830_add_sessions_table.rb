# frozen_string_literal: true

# This migration file is generated automatically by activerecord-session_store
# ref: https://github.com/rails/activerecord-session_store
# (and formatted by our Rubocop configuration)

class AddSessionsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.string :session_id, null: false
      t.text :data
      t.timestamps
    end

    add_index :sessions, :session_id, unique: true
    add_index :sessions, :updated_at
  end
end
