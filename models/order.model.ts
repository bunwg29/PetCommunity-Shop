import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userInfo: {
            fullName: String,
            email: String,
            phone: String,
            address: String,
        },
        products: [
            {
                avt: String,
                name: String,
                size: Number,
                unit: String,
                productId: String,
                price: Number,
                quantity: Number
            }
        ],
        totalPrice: Number,
        status: {
            type: String,
            default: "Confirming"
        }
    }, 
    {
        timestamps: true
    }
);

const OrderModel = mongoose.model("OrderModel", orderSchema, "orders");

export default OrderModel;