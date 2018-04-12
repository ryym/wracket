# frozen_string_literal: true

class AddOpenedAtToBookmarks < ActiveRecord::Migration[5.1]
  def change
    add_column :bookmarks, :opened_at, :datetime
  end
end
