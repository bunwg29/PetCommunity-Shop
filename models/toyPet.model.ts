import mongoose from 'mongoose'

const toyPetSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    price: Number,
    special_offer: String,
    avt: String,
    images: [ {type: String} ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const ToyPetModel = mongoose.model('ToyPetModel', toyPetSchema, 'toy_pet')

export default ToyPetModel
