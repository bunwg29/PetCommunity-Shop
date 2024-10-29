import mongoose from "mongoose";

const foodPetSchema = new mongoose.Schema(
    {
        name: String,
        type: String,
        size: String,
        price: Number,
        special_offer: String,
        avt: String,
        images: Array,
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    } 
);

const FoodPetModel = mongoose.model("FoodModel", foodPetSchema, "food_pet");

export default FoodPetModel;