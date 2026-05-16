require "rails_helper"

RSpec.describe Book, type: :model do
  subject { build(:book) }

  describe "associations" do
    it { should belong_to(:author) }
    it { should belong_to(:publisher) }
    it { should belong_to(:genre) }
  end

  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:price) }
    it { should validate_numericality_of(:price).is_greater_than_or_equal_to(0) }
  end
end
