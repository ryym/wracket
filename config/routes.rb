# frozen_string_literal: true

# http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  root 'welcome#index'

  post '/login', to: 'sessions#login'
  get '/oauth_callback', to: 'sessions#create'

  get 'home', to: 'home#index'

  resources :images, only: [] do
    member do
      # XXX: Has a side effect.
      get 'transform', to: 'transform'
    end
  end

  resources :entry_images, only: [] do
    member do
      # XXX: Has a side effect.
      get 'attach', to: 'attach'
    end
  end

  put '/_raise', to: 'ping#test_raise'

  namespace :api, { format: :json } do
    get 'ping', to: 'ping#ping'
    get 'bookmarks/search', to: 'search#index'
    put 'bookmarks/sync', to: 'sync#import_updates'

    scope 'bookmarks/:id' do
      put '/open', to: 'bookmarks#open'
      put '/reset_open', to: 'bookmarks#reset_open'
      put '/favorite', to: 'bookmarks#favorite'
      put '/unfavorite', to: 'bookmarks#unfavorite'
      put '/archive', to: 'bookmarks#archive'
      put '/readd', to: 'bookmarks#readd'
      put '/delete', to: 'bookmarks#delete'
    end

    match '(*path)', via: :all, to: proc { [404, {}, ['api not found']] }
  end
end
