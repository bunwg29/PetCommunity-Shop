import { Request, Response } from 'express';
import PetModel from '../../models/pet.model';
import FoodPetModel from '../../models/foodPet.model';
import ToyPetModel from '../../models/toyPet.model';
import BlogModel from '../../models/blog.model';
// [GET] Information about new pet, new product is served for dashboard interface
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
  };
  const petInfo = await PetModel.find(find).sort({ updatedAt: -1 }).limit(8);

  const foodPetInfo = await FoodPetModel.find(find).sort({ updatedAt: -1 }).limit(8);

  const toyPetInfo = await ToyPetModel.find(find).sort({ updatedAt: -1 }).limit(8);

  const blogInfo = await BlogModel.find(find).sort({ updatedAt: -1 }).limit(3);

  res.render('client/pages/dashboard/index', {
    title: 'PetCommunity',
    user: res.locals.user ? res.locals.user : null,
    petInfo: petInfo,
    foodPetInfo: foodPetInfo,
    toyPetInfo: toyPetInfo,
    blogInfo: blogInfo,
    isDashboard: true,
  });
};
