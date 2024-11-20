import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    dateBirth: Date,
    phone: String,
    password: String,
    tokenUser: String,
    avatar: String,
    linkFb: String,
    thumbnail: String,
    status: {
      type: String,
      default: 'active',
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

const AccountModel = mongoose.model('UserModel', userSchema, 'user')

export default AccountModel
