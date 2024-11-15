import { Request, Response } from 'express';

import PetModel from '../models/pet.model';

export const index = async (req: Request, res: Response) => {
    
    const find: Object = {
        uploadBy: req.params.id,
        deleted: false
    };

    const myPet = await PetModel.find(find);

    res.render("pages/mypet/index.pug", {
        title: "MyPet | Product",
        myPet
    });    
    
};

export const detail = async (req: Request, res: Response) => {
    
    const find: Object = {
        _id: req.params.id,
        deleted: false
    };

    const petDetail = await PetModel.findOne(find);

    res.render("pages/mypet/edit.pug", {
        title: "MyPet | Pet Detail",
        petDetail
    });    
    
};

export const editPatch = async (req: Request, res: Response) => {
    
    req.body.price = parseInt(req.body.price);
    req.body.age = parseInt(req.body.age);
    
    const {uploadedData, ...updateData} = req.body;
    
    
    try {

        await PetModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    avt: uploadedData.avt,
                    ...updateData
                },
                ...(uploadedData.images && uploadedData.images.length ? { $push: { images: { $each: uploadedData.images } } } : {})
            },
            { new: true }
        );

        res.redirect("/category");

    } catch (error) {
        console.log(error);
        
    }
   
};

export const deleteImages = async (req: Request, res: Response) => {

    try {
        
        const { petId } = req.params;
        const { imageUrl } = req.body;
    
        await PetModel.findByIdAndUpdate(
            
          petId,
          { $pull: { images: imageUrl } }, 
          { new: true }

        );

    } catch (error) {

        res.send("Delete image failed")

    }

};