# https://github.com/rails/activerecord-session_store
Rails.application.config.session_store(
  :active_record_store,
  expire_after: 14.days,
)
