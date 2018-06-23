# frozen_string_literal: true

# https://github.com/rails/activerecord-session_store
# Though normally we don't use this model, we can easily access and inspect
# sessions table in Rails console using this model.
class Session < ApplicationRecord
  def decode64
    Base64.decode64(data)
  end
end
