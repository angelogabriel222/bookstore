require "rails_helper"

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe "validations" do
    it { should validate_presence_of(:role) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
  end

  describe "enums" do
    it { should define_enum_for(:role).with_values(customer: 0, admin: 1, superadmin: 2) }
  end

  describe "devise modules" do
    it "responds to email" do
      expect(subject).to respond_to(:email)
    end

    it "responds to valid_password?" do
      expect(subject).to respond_to(:valid_password?)
    end
  end
end
