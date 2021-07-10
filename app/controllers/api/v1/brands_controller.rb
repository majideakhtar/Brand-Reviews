module Api
  module V1
    class BrandsController < ApplicationController
      def index
        brands = Brand.all

        render json: BrandSerializer.new(brands, options).serializable_hash.to_json
      end

      def show
        brand = Brand.find_by(slug: params[:slug])

        render json: BrandSerializer.new(brand, options).serializable_hash.to_json
      end

      def create
        brand = Brand.new(brand_params)

        if brand.save
          render json: BrandSerializer.new(brand).serializable_hash.to_json
        else
          render json: { error: brand.errors.messages }, status: 422
        end
      end

      def update
        brand = Brand.find_by(slug: params[:slug])

        if brand.update(brand_params)
          render json: BrandSerializer.new(brand, options).serializable_hash.to_json
        else
          render json: { error: brand.errors.messages }, status: 422
        end
      end

      def destroy
        brand = Brand.find_by(slug: params[:slug])

        if brand.destroy
          head :no_content
        else
          render json: { error: brand.errors.messages }, status: 422
        end
      end


      private

      def brand_params
        params.require(:brand).permit(:name, :image_url)
      end

      def options
        @options ||= {include: %i[reviews]}
      end
    end
  end
end