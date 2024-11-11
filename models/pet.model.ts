import mongoose from 'mongoose'
import slugUpdater from 'mongoose-slug-updater'
mongoose.plugin(slugUpdater)

const petSchema = new mongoose.Schema(
  {
    id_code: String,
    name: String,
    gene: String,
    age: Number,
    price: Number,
    avt: String,
    images: Array,
    size: String,
    color: String,
    vacinated: String,
    dewormed: String,
    cert: String,
    location: String,
    published_date: Date,
    additional_info: String,
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
)

const PetModel = mongoose.model('PetModel', petSchema, 'pet')

export default PetModel
