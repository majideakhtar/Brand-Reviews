module Api
  module V1
    class ReviewsController < ApplicationController

      def create
        review = brand.reviews.new(review_params)

        if review.save 
          render json: ReviewSerializer.new(review).serializable_hash.to_json
        else
          render json: {error: review.errors.messages },status: 422
        end
      end

      def destroy
        review = Review.find(params[:id])

        if review.destroy 
          head :no_content
        else
          render json: {error: review.errors.messages },status: 422
        end
      end

      private

      def brand
        @brand ||= Brand.find(params[:brand_id]) 
      end
      def review_params
        params.require(:review).permit(:title, :description, :score, :brand_id)
      end

    end
  end
end