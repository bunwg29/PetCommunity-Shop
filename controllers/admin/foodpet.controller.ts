import { Request, Response } from "express";

import FoodPetModel from "../../models/foodPet.model";

// [GET] admin/foodpet
export const index = async (req: Request, res: Response) => {

    const foodPet = await FoodPetModel.find();

    res.render("admin/pages/foodpet/index", {
        title: "Admin | FoodPet",
        foodPet
    });

};