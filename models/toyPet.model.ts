import mongoose from 'mongoose';
<<<<<<< HEAD
=======
import slugUpdater from 'mongoose-slug-updater';
mongoose.plugin(slugUpdater);
>>>>>>> 10/client

const toyPetSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
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

const ToyPetModel = mongoose.model('ToyPetModel', toyPetSchema, 'toy_pet');

export default ToyPetModel;
