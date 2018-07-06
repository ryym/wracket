# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.5'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'jbuilder'
gem 'activerecord-import'
gem 'activerecord-session_store'

# https://github.com/rails/sprockets/commit/2f7b7e5e67f47c32a2d637b7e90dfa5ecf922eb3
# We don't use sprockets at all but `rails` gem depends on it.
gem 'sprockets', '~> 3.7.2'

# https://github.com/rails/rails-html-sanitizer/commit/f3ba1a839a35f2ba7f941c15e239a1cb379d56ae
gem 'rails-html-sanitizer', '>= 1.0.4'

group :development, :test do
  gem 'dotenv-rails'
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'rubocop', '>= 0.54', require: false
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

ruby "2.4.1"
