import { Request, Response } from 'express';

import { systemConfig } from '../../config/adminPrefix';

import FoodPetModel from '../../models/foodPet.model';

// [GET] admin/foodpet
export const index = async (req: Request, res: Response) => {
  const foodPet = await FoodPetModel.find();

  res.render('admin/pages/foodpet/index', {
    title: 'Admin | FoodPet',
    foodPet,
  });
};

// [GET] admin/foodpet/detail/:id
export const foodPetDetail = async (req: Request, res: Response) => {
  const foodPetDetail = await FoodPetModel.findOne({ _id: req.params.id });

  res.render('admin/pages/foodpet/edit', {
    title: 'Admin | FoodPet | Detail',
    foodPetDetail,
  });
};

// [GET] admin/foodpet/create
export const create = async (req: Request, res: Response) => {
  res.render('admin/pages/foodpet/create', {
    title: 'Admin | FoodPet | Create',
  });
};

// [POST] admin/foodpet/create
export const createPost = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-food-pet')) {
    try {
      const { name, type, size, unit, price, special_offer, uploadedData } =
        req.body;

      const newFoodPet = new FoodPetModel({
        name,
        type,
        size: parseFloat(size),
        unit,
        price: parseFloat(price),
        special_offer,
        avt: uploadedData.avt,
        images: uploadedData.images,
      });

      await newFoodPet.save();

      res.redirect(`/${systemConfig.prefixAdmin}/foodpet`);
    } catch (error) {
      res.send('sập sàn');
    }
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [PATCH] admin/foodpet/detail/:id
export const foodPetDetailPatch = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-food-pet')) {
    req.body.price = parseInt(req.body.price);
    req.body.size = parseInt(req.body.size);

    const { uploadedData, ...updateData } = req.body;

    try {
      await FoodPetModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            avt: uploadedData.avt,
            ...updateData,
          },
          ...(uploadedData.images && uploadedData.images.length
            ? { $push: { images: { $each: uploadedData.images } } }
            : {}),
        },
        { new: true }
      );

      res.redirect(`/${systemConfig.prefixAdmin}/foodpet`);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [DELETE] admin/foodpet/delete/image/:image/:id
export const deleteImages = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-food-pet')) {
    const { image, id } = req.params;

    const decodedImage = decodeURIComponent(image);

    try {
      const pet = await FoodPetModel.findByIdAndUpdate(
        id,
        { $pull: { images: decodedImage } },
        { new: true }
      );

      if (pet) {
        res.json({ code: 200 });
      } else {
        res.status(404).json({ code: 404, message: 'Pet not found' });
      }
    } catch (error) {
      res.send('TOANG');
    }
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [DELETE] admin/foodpet/delete/:id
export const deletePet = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-food-pet')) {
    await FoodPetModel.deleteOne({
      _id: req.params.id,
    });

    res.json({
      code: 200,
    });
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};
