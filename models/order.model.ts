import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userInfo: {
            fullName: String,
            phone: String,
            address: String,
        },
        products: [
            {
                productId: String,
                price: Number,
                quantity: Number
            }
        ]
    }, 
    {
        timestamps: true
    }
);

const OrderModel = mongoose.model("OrderModel", orderSchema, "orders");

export default OrderModel;