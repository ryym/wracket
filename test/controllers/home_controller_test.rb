require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should be redirected" do
    get home_path
    assert_response :redirect
  end
end
