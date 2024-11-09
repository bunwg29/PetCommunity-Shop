import { Request, Response } from 'express'
import PetModel from '../models/pet.model'
import FoodPetModel from '../models/foodPet.model';
import ToyPetModel from '../models/toyPet.model';
import BlogModel from '../models/blog.model';
// [GET] Information about new pet, new product is served for dashboard interface
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false
  }
  const petInfo = await PetModel.find(find);

  const foodPetInfo = await FoodPetModel.find(find);

  const toyPetInfo = await ToyPetModel.find(find);

  const blogInfo = await BlogModel.find(find);
  
  res.render('pages/dashboard/index', {
    user: res.locals.user ? res.locals.user : null,
    petInfo: petInfo,
    foodPetInfo: foodPetInfo,
    toyPetInfo: toyPetInfo,
    blogInfo: blogInfo,
    isDashboard: true
  });  
};
