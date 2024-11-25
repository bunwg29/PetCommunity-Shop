import { NextFunction, Request, Response } from "express";

import CartModel from "../../models/cart.model";

export const checkCartCookies = async (req: Request, res: Response, next: NextFunction) => {

    const expires = 30 * 24 * 60 * 60 * 1000;

    if (!req.cookies.cartId) {
        const cartModel =  new CartModel();
        cartModel.save();

        res.cookie("cartId", cartModel._id, { expires: new Date(Date.now() + expires)});
    } else {
        const cart = await CartModel.findOne({
            _id: req.cookies.cartId
        });

        res.locals.cart = cart.products.length || 0;
    }

    next();

};