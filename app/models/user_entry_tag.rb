class UserEntryTag < ApplicationRecord
  # See UserEntry comments for the reason of `required: false`.
  belongs_to :user_entry, required: false, inverse_of: :user_entry_tags
  belongs_to :tag, required: false, inverse_of: :user_entry_tags
end
