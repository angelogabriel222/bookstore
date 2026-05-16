class Book < ApplicationRecord
  belongs_to :author
  belongs_to :publisher
  belongs_to :genre

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
