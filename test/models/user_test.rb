# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'valids' do
    user = User.new(username: 'alice', access_token: 'abc123')
    assert user.valid?
  end
end
