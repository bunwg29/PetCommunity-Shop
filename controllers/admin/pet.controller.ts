import { Request, Response } from 'express';
import moment from 'moment';

import PetModel from '../../models/pet.model';
import { systemConfig } from '../../config/adminPrefix';
import { Pagination } from '../../helpers/pagination.helper';

// [GET] admin/pet
export const index = async (req: Request, res: Response) => {
  const pagination = await Pagination(req, PetModel, {});

  const pet = await PetModel.find()
    .limit(pagination.limitItems)
    .skip(pagination.skip);

  const petInfo = pet.map((item) => ({
    ...item.toObject(),
    createDate: moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss'),
  }));

  res.render('admin/pages/pet/index', {
    title: 'Admin | Pet',
    petInfo,
    pagination,
  });
};

// [GET] admin/pet/detail/:id
export const petDetail = async (req: Request, res: Response) => {
  const petDetail = await PetModel.findOne({
    _id: req.params.id,
  });

  res.render('admin/pages/pet/edit.pug', {
    title: 'Admin | Pet Detail',
    petDetail,
  });
};

// [PATCH] admin/pet/edit/:id
export const petPatch = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-product')) {
    req.body.price = parseInt(req.body.price);
    req.body.age = parseInt(req.body.age);

    const { uploadedData, ...updateData } = req.body;

    try {
      await PetModel.findByIdAndUpdate(
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

      res.redirect(`/${systemConfig.prefixAdmin}/pet`);
      req.flash('success', 'Update success');
    } catch (error) {
      req.flash('error', 'Update failed');
    }
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [DELETE] admin/pet/delete/:id
export const deletePet = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-product')) {
    await PetModel.deleteOne({
      _id: req.params.id,
    });

    res.json({
      code: 200,
    });

    req.flash('success', 'Update success');
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [DELETE] admin/pet/delete/image/:image/:id
export const deleteImages = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-product')) {
    const { image, id } = req.params;

    const decodedImage = decodeURIComponent(image);

    try {
      const pet = await PetModel.findByIdAndUpdate(
        id,
        { $pull: { images: decodedImage } },
        { new: true }
      );

      if (pet) {
        res.json({ code: 200 });
        req.flash('success', 'Update success');
      } else {
        res.status(404).json({ code: 404, message: 'Pet not found' });
      }
    } catch (error) {
      req.flash('error', 'Update failed');
    }
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};
