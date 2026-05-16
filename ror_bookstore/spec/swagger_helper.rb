require "rails_helper"

RSpec.configure do |config|
  config.openapi_root = Rails.root.join("swagger").to_s

  config.openapi_specs = {
    "v1/swagger.yaml" => {
      openapi: "3.0.3",
      info: {
        title: "Ror Bookstore API",
        version: "v1",
        description: "API for managing a bookstore"
      },
      components: {
        securitySchemes: {
          bearer_auth: {
            type: :http,
            scheme: :bearer,
            bearerFormat: "JWT"
          }
        },
        schemas: {
          book: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              description: { type: :string },
              price: { type: :number, format: :decimal },
              author_id: { type: :integer },
              publisher_id: { type: :integer },
              genre_id: { type: :integer },
              created_at: { type: :string, format: "date-time" },
              updated_at: { type: :string, format: "date-time" }
            },
            required: %w[name price author_id publisher_id genre_id]
          },
          author: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              description: { type: :string },
              created_at: { type: :string, format: "date-time" },
              updated_at: { type: :string, format: "date-time" }
            },
            required: %w[name]
          },
          publisher: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              description: { type: :string },
              created_at: { type: :string, format: "date-time" },
              updated_at: { type: :string, format: "date-time" }
            },
            required: %w[name]
          },
          genre: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              description: { type: :string },
              created_at: { type: :string, format: "date-time" },
              updated_at: { type: :string, format: "date-time" }
            },
            required: %w[name]
          },
          user: {
            type: :object,
            properties: {
              id: { type: :integer },
              email: { type: :string },
              role: { type: :string, enum: %w[customer admin superadmin] }
            },
            required: %w[email password]
          }
        }
      },
      paths: {},
      servers: [
        {
          url: "http://localhost:3010",
          description: "Development server"
        }
      ]
    }
  }

  config.openapi_format = :yaml
end
