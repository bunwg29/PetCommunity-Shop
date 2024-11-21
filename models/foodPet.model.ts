import mongoose from 'mongoose'

const foodPetSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    size: Number,
    unit: String,
    price: Number,
    special_offer: String,
    avt: String,
    images: {
      type: Array,
      default: []
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const FoodPetModel = mongoose.model('FoodModel', foodPetSchema, 'food_pet')

export default FoodPetModel
