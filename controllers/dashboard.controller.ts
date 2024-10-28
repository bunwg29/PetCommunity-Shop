import { Request, Response } from 'express'
import PetModel from '../models/pet.model'

// [GET] pet infomation
export const index = async (req: Request, res: Response) => {
  const petInfo = await PetModel.find({
    deleted: false
  });

  res.render('pages/dashboard/index', {
    petInfo: petInfo
  });
};
