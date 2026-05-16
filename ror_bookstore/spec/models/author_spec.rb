require "rails_helper"

RSpec.describe Author, type: :model do
  subject { build(:author) }

  describe "associations" do
    it { should have_many(:books).dependent(:restrict_with_error) }
  end

  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end
end
