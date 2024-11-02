import { Request, Response } from "express";
import PetModel from "../models/pet.model";

export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false
    };

    const petProduct = await PetModel.find(find);

    res.render("pages/category/index", {
        petProduct: petProduct,
        isCategory: true
    });
};

export const petDetail = async (req: Request, res: Response) => {
    const slug = req.params.slug;

    const findPetDetail = {
        deleted: false,
        slug: slug
    };

    const find = {
        deleted: false
    };

    const petProduct = await PetModel.find(find);

    const petDetail = await PetModel.findOne(findPetDetail)
    // petProduct.forEach(pet => {
    //     pet.images.forEach(img => {
    //         console.log(img.image);
    //     });
    // });
    res.render("pages/category/petDetail", {
        petDetail: petDetail,
        petProduct: petProduct
    });
};