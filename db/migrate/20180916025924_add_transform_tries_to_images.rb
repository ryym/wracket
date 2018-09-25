# frozen_string_literal: true

class AddTransformTriesToImages < ActiveRecord::Migration[5.2]
  def change
    add_column :images, :transform_tries, :integer, null: false, default: 0
  end
end
