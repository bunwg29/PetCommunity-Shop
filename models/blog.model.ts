import mongoose from 'mongoose'
import slugUpdater from 'mongoose-slug-updater'
mongoose.plugin(slugUpdater);

const blogSchema = new mongoose.Schema(
  {
    thumbnail_photo: String,
    title: String,
    description: String,
    content: String,
    uploadBy: String,
    id_blogger: String,
    slug: {
      type: String,
      slug: 'title',
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

const BlogModel = mongoose.model('BlogModel', blogSchema, 'blog')

export default BlogModel
