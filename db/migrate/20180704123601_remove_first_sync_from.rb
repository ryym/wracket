# frozen_string_literal: true

class RemoveFirstSyncFrom < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :first_sync, :integer, null: false, default: 0
  end
end
