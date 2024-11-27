import mongoose from 'mongoose';
import slugUpdater from 'mongoose-slug-updater';
mongoose.plugin(slugUpdater);

const toyPetSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
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

const ToyPetModel = mongoose.model('ToyPetModel', toyPetSchema, 'toy_pet');

export default ToyPetModel;
