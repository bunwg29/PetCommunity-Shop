import mongoose, { Schema } from 'mongoose';

interface ToyCartProduct {
  product_id: string;
  quantity: number;
  totalPrice?: number;
  productInfo?: {
    name: string;
    price: number;
    avt: string;
  };
}

interface CartDocument extends Document {
  products: ToyCartProduct[];
  totalPrice?: number;
}

const cartSchema = new Schema<CartDocument>(
  {
    products: [
      {
        product_id: { type: String, required: true },
        quantity: { type: Number, required: true },
        productInfo: { type: Object, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ToyCartModel = mongoose.model('ToyCartModel', cartSchema, 'toycart');

export default ToyCartModel;
