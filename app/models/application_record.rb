class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  scope :between, (lambda { |field, from, to|
    where("#{field} >= ? AND #{field} <= ?", from, to)
  })
end
