import { Request, Response } from 'express'
import PetModel from '../models/pet.model'
import { Pagination } from '../helpers/pagination.helper';

export const index = async (req: Request, res: Response) => {

  const find: { [key: string]: any } = {
    deleted: false,
  }

  // Start filter pet products based on attributes
  const { gender, minPrice, maxPrice, size } = req.query

  if (typeof gender === 'string') {
    find.gene = { $in: gender.split(',') };
  }

  if (minPrice || (maxPrice && maxPrice !== 'Infinity')) {

    find.price = {};

    if (minPrice) find.price.$gte = parseInt(minPrice as string, 10);
    
    if (maxPrice && maxPrice !== 'Infinity')
      find.price.$lte = parseInt(maxPrice as string, 10);

  }

  if (typeof size === 'string') {
    find.size = { $in: size.split(',') };
  }

  // End filter pet products based on attributes

  // Start pagination of pet products

  const pagination = await Pagination(req, find);

  // End pagination of pet products

  const petProduct = await PetModel.find(find).limit(pagination.limitItems).skip(pagination.skip);

  res.render('pages/category/index', {
    title: 'PetCommunity | Category',
    petProduct: petProduct,
    pagination,
    selectedFilters: { gender, minPrice, maxPrice, size },
    isCategory: true,
  });

};

export const petDetail = async (req: Request, res: Response) => {

  const slug = req.params.slug;

  const findPetDetail: Object = {
    deleted: false,
    slug: slug,
  }

  const find: Object = {
    deleted: false,
  }

  const petProduct = await PetModel.find(find);

  const petDetail = await PetModel.findOne(findPetDetail);

  res.render('pages/category/petDetail', {
    title: 'PetCommunity | Product',
    petDetail: petDetail,
    petProduct: petProduct,
  });

};
