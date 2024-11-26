import { NextFunction, Request, Response } from 'express';

import FoodCartModel from '../../models/foodCart.model';
import ToyCartModel from '../../models/toyCart.model';

export const checkCartCookies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expires = 30 * 24 * 60 * 60 * 1000;

  if (!req.cookies.cartId) {
    const cartModel = new FoodCartModel();
    cartModel.save();

    res.cookie('cartId', cartModel._id, {
      expires: new Date(Date.now() + expires),
    });
  } else {
    const cart = await FoodCartModel.findOne({
      _id: req.cookies.cartId,
    });

    if (cart) {
      res.locals.cart = cart.products.length || 0;
    }
  }

  if (!req.cookies.cartToy) {
    const toyCartModel = new ToyCartModel();
    toyCartModel.save();

    res.cookie('cartToy', toyCartModel._id, {
      expires: new Date(Date.now() + expires),
    });
  } else {
    const cart = await ToyCartModel.findOne({
      _id: req.cookies.cartToy,
    });

    if (cart) {
      res.locals.cartToy = cart.products.length || 0;
    }
  }

  next();
};
