import { Request, Response } from "express";

import ToyPetModel from "../../models/toyPet.model";
import ToyCartModel from "../../models/toyCart.model";

export const index = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartToy;

    const cart = await ToyCartModel.findOne({
        _id: cartId
    });

    cart.totalPrice = 0;
    
    if (cart.products.length > 0) {

        for (const product of cart.products) {
            const productInfo = await ToyPetModel.findOne({
                _id: product.product_id
            }).select("name price avt");

            product.productInfo = {
                name: productInfo.name,
                price: product.quantity * productInfo.price,
                avt: productInfo.avt,
            };

            cart.totalPrice += product.productInfo.price;
        };
    }
    
    res.render("client/pages/toycart/index", {
        title: "My Cart",
        cart
    });

};

export const createCart = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartToy;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    

    const cart = await ToyCartModel.findOne({_id: cartId});
  
    const existProductInCart = cart.products.find(item => item.product_id == productId);
  
    if(existProductInCart) {
      const addProduct = await ToyCartModel.updateOne( {_id: cartId,'products.product_id': productId}, {
        $set: {
          'products.$.quantity': existProductInCart.quantity + quantity
        }
      });

      if (addProduct) {
        req.flash("success", "You have added to your food pet cart");
      }

    } else {
      const newProduct = await ToyCartModel.updateOne( { _id: cartId }, { $push: { products: { product_id: productId, quantity: quantity }}});
      if (newProduct) {
        req.flash("success", "You have added to your food pet cart");
      }
    };

    res.redirect("back");
};

export const reduceItem = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartToy;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);

    try {
        const cart = await ToyCartModel.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                $set: {
                    'products.$.quantity': quantity - 1
                }
            }
        );
    
        if (cart) {
            req.flash("success", "Update quantity of product successfully");
            res.redirect("back");
        }

    } catch (error) {
        req.flash("error", "Update failed");
    }


};

export const addItem = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartToy;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);

    try {
        const cart = await ToyCartModel.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                $set: {
                    'products.$.quantity': quantity + 1
                }
            }
        );
    
        if (cart) {
            res.redirect("back");
            req.flash("success", "Update quantity of product successfully");
        }

    } catch (error) {
        req.flash("error", "Update failed");
    }
    
    
};

export const deleteProduct = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartToy;
    const productId = req.params.productId;

    try {
        const cart = await ToyCartModel.updateOne(
            {_id: cartId }, 
            {
                $pull: { products: { product_id: productId } }
            }
        );
    
        if (cart) {
            res.redirect("back");
            req.flash("success", "Delete product in cart successfully");
        }

    } catch (error) {
        req.flash("error", "Update failed");
    }
    
};