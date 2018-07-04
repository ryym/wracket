# frozen_string_literal: true

class RestoreLastSyncedAtToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :last_synced_at, :datetime
  end
end
