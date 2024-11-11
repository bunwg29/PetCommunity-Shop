import { Request, Response } from 'express'
import PetModel from '../models/pet.model'

export const index = async (req: Request, res: Response) => {
  const find: { [key: string]: any } = {
    deleted: false,
  }

  const { gender, minPrice, maxPrice, size } = req.query

  if (typeof gender === 'string') {
    find.gene = { $in: gender.split(',') }
  }

  if (minPrice || (maxPrice && maxPrice !== 'Infinity')) {
    find.price = {}
    if (minPrice) find.price.$gte = parseInt(minPrice as string, 10)
    if (maxPrice && maxPrice !== 'Infinity')
      find.price.$lte = parseInt(maxPrice as string, 10)
  }

  if (typeof size === 'string') {
    find.size = { $in: size.split(',') }
  }

  const petProduct = await PetModel.find(find)

  res.render('pages/category/index', {
    title: 'PetCommunity | Category',
    petProduct: petProduct,
    selectedFilters: { gender, minPrice, maxPrice, size },
    isCategory: true,
  })
}

export const petDetail = async (req: Request, res: Response) => {
  const slug = req.params.slug

  const findPetDetail = {
    deleted: false,
    slug: slug,
  }

  const find = {
    deleted: false,
  }

  const petProduct = await PetModel.find(find)

  const petDetail = await PetModel.findOne(findPetDetail)

  res.render('pages/category/petDetail', {
    title: 'PetCommunity | Product',
    petDetail: petDetail,
    petProduct: petProduct,
  })
}
