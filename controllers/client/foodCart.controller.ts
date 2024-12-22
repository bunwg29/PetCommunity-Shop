import { Request, Response } from 'express';
import FoodCartModel from '../../models/foodCart.model';
import FoodPetModel from '../../models/foodPet.model';

export const index = async (req: Request, res: Response) => {
  const foodCart = req.cookies.foodCart;

  const cart = await FoodCartModel.findOne({
    _id: foodCart,
  });

  cart.totalPrice = 0;

  if (cart.products.length > 0) {
    for (const product of cart.products) {
      const productInfo = await FoodPetModel.findOne({
        _id: product.product_id,
      }).select('name size unit price avt');

      product.productInfo = {
        name: productInfo.name,
        size: productInfo.size,
        unit: productInfo.unit,
        price: product.quantity * productInfo.price,
        avt: productInfo.avt,
      };

      cart.totalPrice += product.productInfo.price;
    }
  }

  res.render('client/pages/foodCart/index', {
    title: 'My Cart',
    cart,
  });
};

export const createCart = async (req: Request, res: Response) => {
  const foodCart = req.cookies.foodCart;
  const productId = req.params.productId;
  const quantity = parseInt(req.params.quantity);

  const cart = await FoodCartModel.findOne({ _id: foodCart });

  const existProductInCart = cart.products.find(
    (item) => item.product_id == productId
  );

  if (existProductInCart) {
    const addProduct = await FoodCartModel.updateOne(
      { _id: foodCart, 'products.product_id': productId },
      {
        $set: {
          'products.$.quantity': existProductInCart.quantity + quantity,
        },
      }
    );

    if (addProduct) {
      req.flash('success', 'You have added to your food pet cart');
    }
  } else {
    const newProduct = await FoodCartModel.updateOne(
      { _id: foodCart },
      { $push: { products: { product_id: productId, quantity: quantity } } }
    );
    if (newProduct) {
      req.flash('success', 'You have added to your food pet cart');
    }
  }

  res.redirect('back');
};

export const reduceItem = async (req: Request, res: Response) => {
  const foodCart = req.cookies.foodCart;
  const productId = req.params.productId;
  const quantity = parseInt(req.params.quantity);

  try {
    const cart = await FoodCartModel.updateOne(
      {
        _id: foodCart,
        'products.product_id': productId,
      },
      {
        $set: {
          'products.$.quantity': quantity - 1,
        },
      }
    );

    if (cart) {
      req.flash('success', 'Update quantity of product successfully');
      res.redirect('back');
    }
  } catch (error) {
    req.flash('error', 'Update failed');
  }
};

export const addItem = async (req: Request, res: Response) => {
  const foodCart = req.cookies.foodCart;
  const productId = req.params.productId;
  const quantity = parseInt(req.params.quantity);

  try {
    const cart = await FoodCartModel.updateOne(
      {
        _id: foodCart,
        'products.product_id': productId,
      },
      {
        $set: {
          'products.$.quantity': quantity + 1,
        },
      }
    );

    if (cart) {
      res.redirect('back');
      req.flash('success', 'Update quantity of product successfully');
    }
  } catch (error) {
    req.flash('error', 'Update failed');
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const foodCart = req.cookies.foodCart;
  const productId = req.params.productId;

  try {
    const cart = await FoodCartModel.updateOne(
      { _id: foodCart },
      {
        $pull: { products: { product_id: productId } },
      }
    );

    if (cart) {
      res.redirect('back');
      req.flash('success', 'Delete product in cart successfully');
    }
  } catch (error) {
    req.flash('error', 'Update failed');
  }
};
