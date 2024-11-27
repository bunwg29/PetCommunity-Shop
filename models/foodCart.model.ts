import mongoose, { Schema } from 'mongoose';

interface CartProduct {
  product_id: string;
  quantity: number;
  totalPrice?: number;
  productInfo?: {
    name: string;
    size: number;
    unit: string;
    price: number;
    avt: string;
  };
}

interface CartDocument extends Document {
  products: CartProduct[];
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

const FoodCartModel = mongoose.model('FoodCartModel', cartSchema, 'food_carts');

export default FoodCartModel;
