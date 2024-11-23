import { Request, Response } from 'express';
import PetModel from '../../models/pet.model';
import { Pagination } from '../../helpers/pagination.helper';

export const index = async (req: Request, res: Response) => {
  const find: { [key: string]: any } = {
    deleted: false,
  };

  // Start filter pet products based on attributes
  const { gender, minPrice, maxPrice, size, sortKey, sortValue } = req.query;

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
  const pagination = await Pagination(req, PetModel, find);
  // End pagination of pet products

  // Start sort pet

  let sort = {};

  if (sortKey && sortValue) {
    const sortDirection = sortValue === 'desc' ? -1 : 1;

    switch (sortKey) {
      case 'updatedAt':
      case 'createdAt':
      case 'age':
        sort = { [sortKey]: sortDirection };
        break;
      default:
        sort = { updatedAt: -1 };
    }
  } else {
    sort = { updatedAt: -1 };
  }

  // End sort pet

  const petProduct = await PetModel.find(find)
    .sort(sort)
    .limit(pagination.limitItems)
    .skip(pagination.skip);

  res.render('client/pages/category/index', {
    title: 'PetCommunity | Category',
    petProduct: petProduct,
    pagination,
    selectedFilters: { gender, minPrice, maxPrice, size, sortKey, sortValue },
    isCategory: true,
  });
};

export const petDetail = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  const findPetDetail: Object = {
    deleted: false,
    slug: slug,
  };

  const find: Object = {
    deleted: false,
  };

  const petProduct = await PetModel.find(find);

  const petDetail = await PetModel.findOne(findPetDetail);

  res.render('client/pages/category/petDetail', {
    title: 'PetCommunity | Product',
    petDetail: petDetail,
    petProduct: petProduct,
  });
};
