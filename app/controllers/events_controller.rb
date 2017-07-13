class EventsController < ApplicationController
  protect_from_forgery with: :exception, unless: -> { request.format.json? }

  WEEKS_TO_THE_FUTURE = 12

  def bookings
    week_number = Time.zone.now.strftime('%U').to_i

    data = {}
    week_number.upto(week_number + WEEKS_TO_THE_FUTURE).each do |week_number|
      data[week_number] = {
        available: true,
        name: nil
      }
    end

    events = Event.between(:starts_at, Time.zone.now, WEEKS_TO_THE_FUTURE.weeks.from_now)
    events_by_week = {}
    events.each do |event|
      events_by_week[event.week_number] = {
        available: false,
        name: event.name
      }
    end

    render json: { weeks: data.merge!(events_by_week) }
  end

  def index
    @events = Event.future
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render json: { status: 201, message: 'Successfully created event!' }
    else
      render json: { status: 422, errors: @event.errors.full_messages }
    end
  end

  private

  def event_params
    params.require(:event).permit(:name, :starts_at)
  end
end
