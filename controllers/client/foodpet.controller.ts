import { Request, Response } from "express";
import FoodPetModel from "../../models/foodPet.model";


export const index = async (req: Request, res: Response) => {

    const find = {
        deleted: false
    };

    const foodPet = await FoodPetModel.find(find);
    
    res.render("client/pages/foodpet/index", {
        title: "Category | FoodPet",
        foodPet
    });
};

export const detail = async (req: Request, res: Response) => {

    const foodPet = await FoodPetModel.findOne({
        _id: req.params.id
    });
    
    res.render("client/pages/foodpet/detail", {
        title: "FoodPet | Detail",
        foodPet
    });

};
