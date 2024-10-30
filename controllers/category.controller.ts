import { Request, Response } from "express";
import PetModel from "../models/pet.model";

export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false
    };

    const petProduct = await PetModel.find(find);

    res.render("pages/category/index", {
        petProduct: petProduct
    });
};