import { Request, Response } from 'express';
import PetModel from '../../models/pet.model';
import { Pagination } from '../../helpers/pagination.helper';
import AccountModel from '../../models/account.model';

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

  res.render('client/pages/pet/index', {
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

  const morePet = await PetModel.find({ deleted: false }).sort({ updatedAt: -1 }).limit(4);

  const petDetail = await PetModel.findOne(findPetDetail);
  const linkFb = (await AccountModel.findOne({ _id: petDetail.uploadBy }).select('linkFb'));

  res.render('client/pages/pet/petDetail', {
    title: 'PetCommunity | Product',
    petDetail: petDetail,
    morePet: morePet,
    linkFb: linkFb ? linkFb : 'facebook.com'
  });

};
