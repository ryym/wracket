# frozen_string_literal: true

class AddTimestampsToImages < ActiveRecord::Migration[5.1]
  def change
    add_column :images, :created_at, :datetime
    add_column :images, :updated_at, :datetime

    reversible do |dir|
      dir.up do
        # Set current timestamps to avoid allowing nulls.
        # I cannot come up with better solution.
        execute <<~SQL
          UPDATE
            images
          SET
              created_at = CURRENT_TIMESTAMP
            , updated_at = CURRENT_TIMESTAMP
        SQL
        change_column_null(:images, :created_at, false)
        change_column_null(:images, :updated_at, false)
      end
    end
  end
end
