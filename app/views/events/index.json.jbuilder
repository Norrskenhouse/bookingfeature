json.array! @events do |event|
  json.id event.id
  json.name event.name
  json.weekday_name event.weekday_name
  json.week_number event.week_number
  json.starts_at event.starts_at
  json.created_at event.created_at
end
