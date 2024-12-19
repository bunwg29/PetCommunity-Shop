import { Request, Response } from 'express';

import ToyPetModel from '../../models/toyPet.model';

import { Pagination } from '../../helpers/pagination.helper';

export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
  };

  const pagination = await Pagination(req, ToyPetModel, find);

  const toyPet = await ToyPetModel.find(find).limit(pagination.limitItems).skip(pagination.skip);

  res.render('client/pages/toypet/index', {
    title: 'Category | Toypet',
    toyPet,
    pagination,
  });
};

export const detail = async (req: Request, res: Response) => {
  const toyPet = await ToyPetModel.findOne({
    _id: req.params.id,
  });

  const moreToyPet = await ToyPetModel.find( {deleted: false} )
  .sort({ updatedAt: -1 })
  .limit(4);

  res.render('client/pages/toypet/detail', {
    title: 'Toypet | Detail',
    toyPet,
    moreToyPet
  });
};
