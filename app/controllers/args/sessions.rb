# frozen_string_literal: true

require 'singleton'

module Args
  class Sessions
    include Singleton

    def self.create
      instance
    end

    def current_user(ctrl)
      ctrl.current_user
    end
  end
end
