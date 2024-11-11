import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    avt: String,
    title: String,
    description: String,
    content: String,
    uploadBy: String,
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
