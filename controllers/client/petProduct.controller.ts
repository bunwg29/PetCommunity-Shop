import { Request, Response } from 'express';

import PetModel from '../../models/pet.model';

// [GET] /mypet/product/:userId
export const index = async (req: Request, res: Response) => {
  const find: Object = {
    uploadBy: req.params.id,
    deleted: false,
  };

  const myPet = await PetModel.find(find);

  res.render('client/pages/mypet/index.pug', {
    title: 'MyPet | Product',
    myPet,
  });
};

// [GET] /mypet/edit/detail/:petId
export const detail = async (req: Request, res: Response) => {
  const find: Object = {
    _id: req.params.id,
    deleted: false,
  };

  const petDetail = await PetModel.findOne(find);

  res.render('client/pages/mypet/edit.pug', {
    title: 'MyPet | Pet Detail',
    petDetail,
  });
};

// [GET] /mypet/create/:userId
export const create = async (req: Request, res: Response) => {
  res.render('client/pages/mypet/create', {
    title: 'MyPet | Create',
  });
};

// [POST] /mypet/create/:userId
export const createPost = async (req: Request, res: Response) => {
  try {
    const {
      name,
      gene,
      age,
      price,
      size,
      color,
      vacinated,
      dewormed,
      cert,
      location,
      additional_info,
      uploadedData,
    } = req.body;

    const newPet = new PetModel({
      name,
      gene,
      age: parseInt(age, 10),
      price: parseFloat(price),
      avt: uploadedData.avt,
      size,
      color,
      vacinated,
      dewormed,
      cert,
      location,
      additional_info,
      images: uploadedData.images,
      uploadBy: req.params.id,
    });

    await newPet.save();

    res.redirect('/pet');
  } catch (error) {
    res.send('sập sàn');
  }
};

// [PATCH] /mypet/edit/detail/:petId
export const editPatch = async (req: Request, res: Response) => {
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

    res.redirect('/pet');
  } catch (error) {
    console.log(error);
  }
};

// [DELETE] /mypet/delete/image/:petId
export const deleteImages = async (req: Request, res: Response) => {
  const petId = req.body.petId;
  const imageUrl = req.body.imageUrl;

  try {
    await PetModel.findByIdAndUpdate(
      petId,
      { $pull: { images: imageUrl } },
      { new: true }
    );

    res.redirect(`/mypet/edit/detail/${petId}`);
  } catch (error) {
    res.send('TOANG');
  }
};

// [DELETE] /mypet/delete/pet/:petId
export const deletePet = async (req: Request, res: Response) => {
  await PetModel.findByIdAndDelete(req.body.petDeleteId);

  res.redirect(`/mypet/product/${res.locals.user.id}`);
};
