class ReviewSerializer
  # include FastJsonapi::ObjectSerializer
  include JSONAPI::Serializer
  
  attributes :title, :description, :score, :brand_id
end
