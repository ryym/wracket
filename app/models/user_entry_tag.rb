class UserEntryTag < ApplicationRecord
  belongs_to :user_entry
  belongs_to :tag
end
