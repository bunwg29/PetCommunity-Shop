import { Request, Response } from 'express'
import PetModel from '../models/pet.model'
import FoodPetModel from '../models/foodPet.model';
import ToyPetModel from '../models/toyPet.model';
// [GET] Information about new pet, new product is served for dashboard interface
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false
  }
  const petInfo = await PetModel.find(find);

  const foodPetInfo = await FoodPetModel.find(find);

  const toyPetInfo = await ToyPetModel.find(find);

  res.render('pages/dashboard/index', {
    petInfo: petInfo,
    foodPetInfo: foodPetInfo,
    toyPetInfo: toyPetInfo
  });
};
