# frozen_string_literal: true

# http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  root 'welcome#index'

  post '/login', to: 'sessions#login'
  get '/oauth_callback', to: 'sessions#create'

  get 'home', to: 'home#index'
end
