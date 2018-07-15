# frozen_string_literal: true

class PingController < ViewBaseController
  require_login false

  skip_before_action :verify_authenticity_token

  RAISE_PASSSWORD = ENV['TEST_EXCEPTION_PASSWORD'] || SecureRandom.hex(5)

  # curl <url> -X PUT -d 'password=???'
  def test_raise
    return render status: :not_found, plain: '' if params['password'] != RAISE_PASSSWORD
    raise '[TEST] This is a test exception'
  end
end
