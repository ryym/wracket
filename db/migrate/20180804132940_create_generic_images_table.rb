# frozen_string_literal: true

class CreateGenericImagesTable < ActiveRecord::Migration[5.2]
  def change
    rename_table :images, :entry_images

    create_table :images do |t|
      t.string :digest, null: false, index: true, unique: true
      t.string :content_type
      t.json :variants, null: false, default: {}
      t.timestamps
    end

    # This time we give up compatible deployment.
    rename_column :entry_images, :image_id, :pocket_image_id
    add_reference :entry_images, :image, index: true, foreign_key: true
  end
end
