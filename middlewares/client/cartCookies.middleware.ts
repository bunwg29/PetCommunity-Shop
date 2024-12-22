import { Request, Response, NextFunction } from "express";
import FoodCartModel from "../../models/foodCart.model";
import ToyCartModel from "../../models/toyCart.model";

const setCartCookies = (res: Response, foodCartId: string, toyCartId: string, expires: number) => {
    res.cookie('foodCart', foodCartId, { expires: new Date(Date.now() + expires) });
    res.cookie('toyCart', toyCartId, { expires: new Date(Date.now() + expires) });
};

export const cookiesCart = async (req: Request, res: Response, next: NextFunction) => {
    const tokenUser = req.cookies.tokenUser;
    const foodCartCookies = req.cookies.foodCart;
    const toyCartCookies = req.cookies.toyCart;
    const expires = 30 * 24 * 60 * 60 * 1000;

    if (!tokenUser) {
        if (foodCartCookies || toyCartCookies) {
            res.clearCookie('foodCart');
            res.clearCookie('toyCart');
        }
        return next();
    }

    try {
        const foodCartId = await FoodCartModel.findOne({ userId: tokenUser });
        const toyCartId = await ToyCartModel.findOne({ userId: tokenUser });

        if (foodCartCookies && toyCartCookies) {
            if (
                foodCartId && toyCartId &&
                (foodCartCookies !== foodCartId._id.toString() || toyCartCookies !== toyCartId._id.toString())
            ) {
                setCartCookies(res, foodCartId._id.toString(), toyCartId._id.toString(), expires);
            }
            return next();
        }

        if (!foodCartCookies && !toyCartCookies) {
            if (foodCartId && toyCartId) {
                setCartCookies(res, foodCartId._id.toString(), toyCartId._id.toString(), expires);
            } else {
                const foodCart = new FoodCartModel({ userId: tokenUser });
                const toyCart = new ToyCartModel({ userId: tokenUser });
                await foodCart.save();
                await toyCart.save();
                setCartCookies(res, foodCart._id.toString(), toyCart._id.toString(), expires);
            }
        }
    } catch (error) {
        req.flash('error', 'Server error');
    }

    next();
};
