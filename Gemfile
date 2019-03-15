# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'activerecord-import'
gem 'activerecord-session_store'
gem 'bootsnap', require: false
gem 'jbuilder'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.7'
gem 'sentry-raven'

# activestorage: https://groups.google.com/forum/#!msg/rubyonrails-security/3KQRnXDIuLg/mByx5KkqBAAJ
# actionview: https://groups.google.com/forum/#!topic/rubyonrails-security/GN7w9fFAQeI
# railties: https://groups.google.com/forum/#!topic/rubyonrails-security/IsQKvDqZdKw
gem 'rails', '~> 5.2', '>= 5.2.2.1'

# GitHub warns that the versions >= 2.0.0 and < 2.0.6 are vulnerable.
# CVE-2018-16470 , CVE-2018-16471
gem 'rack', '>= 2.0.6'

# https://github.com/rails/sprockets/commit/2f7b7e5e67f47c32a2d637b7e90dfa5ecf922eb3
# We don't use sprockets at all but `rails` gem depends on it.
gem 'sprockets', '~> 3.7.2'

# https://github.com/rails/rails-html-sanitizer/commit/f3ba1a839a35f2ba7f941c15e239a1cb379d56ae
gem 'rails-html-sanitizer', '>= 1.0.4'

# https://github.com/flavorjones/loofah/issues/154
gem 'loofah', '>= 2.2.3'

# For image storing/processing
gem 'google-cloud-storage', require: false
gem 'marcel', require: false
gem 'mini_magick', require: false

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'rubocop', '>= 0.54', require: false
end

group :development do
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'

  # 1.2.1 or lower has a vulnerability.
  # https://github.com/rubyzip/rubyzip/issues/369
  gem 'rubyzip', '~> 1.2.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

ruby '2.4.1'
