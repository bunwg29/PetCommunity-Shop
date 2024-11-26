import mongoose from 'mongoose';
<<<<<<< HEAD
=======
import slugUpdater from 'mongoose-slug-updater';
mongoose.plugin(slugUpdater);
>>>>>>> 10/client

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
<<<<<<< HEAD
=======
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
>>>>>>> 10/client
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
