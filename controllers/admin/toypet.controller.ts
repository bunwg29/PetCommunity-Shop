import { Request, Response } from 'express';

import { systemConfig } from '../../config/adminPrefix';

import ToyPetModel from '../../models/toyPet.model';
import { Pagination } from '../../helpers/pagination.helper';

// [GET] admin/toypet
export const index = async (req: Request, res: Response) => {
  const pagination = await Pagination(req, ToyPetModel, {});
  const toyPet = await ToyPetModel.find()
    .limit(pagination.limitItems)
    .skip(pagination.skip);

  res.render('admin/pages/toypet/index', {
    title: 'Admin | ToyPet',
    toyPet,
    pagination,
  });
};

// [GET] admin/toypet/detail/:id
export const toyPetDetail = async (req: Request, res: Response) => {
  const toyPetDetail = await ToyPetModel.findOne({ _id: req.params.id });

  res.render('admin/pages/toypet/edit', {
    title: 'Admin | ToyPet | Detail',
    toyPetDetail,
  });
};

// [GET] admin/toypet/create
export const create = async (req: Request, res: Response) => {
  res.render('admin/pages/toypet/create', {
    title: 'Admin | ToyPet | Create',
  });
};

// [POST] admin/toypet/create
export const createPost = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-toy-pet')) {
    try {
      const { name, type, price, special_offer, uploadedData } = req.body;

      const newToyPet = new ToyPetModel({
        name,
        type,
        price: parseFloat(price),
        special_offer,
        avt: uploadedData.avt,
        images: uploadedData.images,
      });

      await newToyPet.save();

      res.redirect(`/${systemConfig.prefixAdmin}/toypet`);
    } catch (error) {
      req.flash('error', 'Update failed');
    }
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [PATCH] admin/toypet/detail/:id
export const toyPetDetailPatch = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-toy-pet')) {
    req.body.price = parseFloat(req.body.price);

    const { uploadedData, ...updateData } = req.body;

    try {
      await ToyPetModel.findByIdAndUpdate(
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

      res.redirect(`/${systemConfig.prefixAdmin}/toypet`);
      req.flash('success', 'Update success');
    } catch (error) {
      req.flash('error', 'Update failed');
    }
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [DELETE] admin/toypet/delete/image/:image/:id
export const deleteImages = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-toy-pet')) {
    const { image, id } = req.params;

    const decodedImage = decodeURIComponent(image);

    try {
      const pet = await ToyPetModel.findByIdAndUpdate(
        id,
        { $pull: { images: decodedImage } },
        { new: true }
      );

      if (pet) {
        res.json({ code: 200 });
        req.flash('success', 'Update success');
      } else {
        req.flash('error', 'Update failed');
      }
    } catch (error) {
      req.flash('error', 'Update failed');
    }
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [DELETE] admin/toypet/delete/:id
export const deletePet = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-toy-pet')) {
    const toy = await ToyPetModel.deleteOne({
      _id: req.params.id,
    });

    res.json({
      code: 200,
    });

    if (toy) {
      req.flash('success', 'Update success');
    } else {
      req.flash('error', 'Update failed');
    }
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};
