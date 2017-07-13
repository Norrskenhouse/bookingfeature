class EventsController < ApplicationController
  protect_from_forgery with: :exception, unless: -> { request.format.json? }

  def index
    @events = Event.future
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render json: { status: 201, message: 'Successfully created event!' }
    else
      render json: { errors: @event.errors.full_messages }
    end
  end

  private

  def event_params
    params.require(:event).permit(:name, :starts_at)
  end
end
