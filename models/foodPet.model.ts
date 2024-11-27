import mongoose from 'mongoose';
import slugUpdater from 'mongoose-slug-updater';
mongoose.plugin(slugUpdater);

const foodPetSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    size: Number,
    unit: String,
    price: Number,
    special_offer: String,
    avt: String,
    images: [{ type: String }],
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const FoodPetModel = mongoose.model('FoodModel', foodPetSchema, 'food_pet');

export default FoodPetModel;
