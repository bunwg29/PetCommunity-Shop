import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userInfo: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    products: [
      {
        avt: String,
        name: String,
        productId: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      default: 'Confirming',
    },
  },
  {
    timestamps: true,
  }
);

const ToyOrderModel = mongoose.model('ToyOrderModel', orderSchema, 'toy_order');

export default ToyOrderModel;
