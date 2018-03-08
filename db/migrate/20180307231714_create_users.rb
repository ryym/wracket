class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :access_token, null: false, limit: 32
      t.timestamps

      t.index :username, unique: true
    end
  end
end
