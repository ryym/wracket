class UserEntryTag < ApplicationRecord
  # See UserEntry comments for the reason of `required: false`.
  belongs_to :user_entry, required: false
  belongs_to :tag, required: false
end
