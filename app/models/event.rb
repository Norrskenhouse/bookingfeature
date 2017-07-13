class Event < ApplicationRecord
  validates :name, presence: true
  validates :starts_at, presence: true

  validate :validate_starts_at_allowed_datetime
  validate :validate_unique_day_for_starts_at
  validate :validate_starts_at_in_the_future

  WEEKDAY_MAP = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  }.freeze

  scope :future, -> { where('starts_at > ?', Time.zone.now) }

  scope :same_day_events, lambda { |date|
    where(starts_at: date.beginning_of_day..date.end_of_day)
  }

  def validate_starts_at_in_the_future
    return unless starts_at
    return if starts_at > Time.zone.now

    errors.add(:starts_at, 'must be in the future')
  end

  def validate_unique_day_for_starts_at
    return unless starts_at
    return if self.class.same_day_events(starts_at).empty?

    errors.add(:starts_at, 'there is already an event planned for this day')
  end

  def validate_starts_at_allowed_datetime
    # NOTE: starts_at will be an instance of ActiveSupport::TimeWithZone
    return unless starts_at

    weekday_name = :tuesday
    return if starts_at.wday == WEEKDAY_MAP[:tuesday]

    errors.add(:starts_at, "must be on a #{weekday_name.to_s.titleize}")
  end

  def weekday_name
    WEEKDAY_MAP.invert[starts_at.wday].to_s.titleize
  end

  def week_number
    starts_at.strftime('%U').to_i
  end
end
