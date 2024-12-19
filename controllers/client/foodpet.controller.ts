import { Request, Response } from 'express';
import FoodPetModel from '../../models/foodPet.model';

import { Pagination } from '../../helpers/pagination.helper';

export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
  };

  const pagination = await Pagination(req, FoodPetModel, find);

  const foodPet = await FoodPetModel.find(find)
    .limit(pagination.limitItems)
    .skip(pagination.skip);

  res.render('client/pages/foodpet/index', {
    title: 'Category | FoodPet',
    foodPet,
    pagination,
  });
};

export const detail = async (req: Request, res: Response) => {
  const foodPet = await FoodPetModel.findOne({
    _id: req.params.id,
  });

  const moreFoodPet = await FoodPetModel.find({ deleted: false })
    .sort({ updatedAt: -1 })
    .limit(4);

  res.render('client/pages/foodpet/detail', {
    title: 'FoodPet | Detail',
    foodPet,
    moreFoodPet: moreFoodPet
  });
};
