import { Request, Response } from 'express';

import ToyPetModel from '../../models/toyPet.model';

export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
  };

  const toyPet = await ToyPetModel.find(find);

  res.render('client/pages/toypet/index', {
    title: 'Category | Toypet',
    toyPet,
  });
};

export const detail = async (req: Request, res: Response) => {
  const toyPet = await ToyPetModel.findOne({
    _id: req.params.id,
  });

  res.render('client/pages/toypet/detail', {
    title: 'Toypet | Detail',
    toyPet,
  });
};
