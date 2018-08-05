# frozen_string_literal: true

class AddAttachTriesToEntryImages < ActiveRecord::Migration[5.2]
  def change
    add_column :entry_images, :attach_tries, :integer, null: false, default: 0
  end
end
