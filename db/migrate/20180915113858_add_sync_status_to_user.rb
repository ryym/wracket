# frozen_string_literal: true

class AddSyncStatusToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :sync_status, :integer, default: 0, null: false
  end
end
