import { Request, Response } from 'express';
import CartModel from '../../models/cart.model';
import FoodPetModel from '../../models/foodPet.model';
import OrderModel from '../../models/order.model';
import moment from 'moment';

// [POST] order/create/:userId
export const createOrder = async (req: Request, res: Response) => {
  const cartId = req.cookies.cartId;
  const { totalPrice, ...userInfo } = req.body;

  const orderData = {
    userInfo: userInfo,
    products: [],
    totalPrice: totalPrice,
  };

  const cart = await CartModel.findOne({ _id: cartId });

  if (cart) {
    try {
      for (const item of cart.products) {
        const productInfo = await FoodPetModel.findOne({
          _id: item.product_id,
        });

        orderData.products.push({
          avt: productInfo.avt,
          name: productInfo.name,
          size: productInfo.size,
          unit: productInfo.unit,
          productId: item.product_id,
          price: productInfo.price,
          quantity: item.quantity,
        });
      }

      const order = new OrderModel(orderData);
      await order.save();
      await CartModel.updateOne({ _id: cartId }, { products: [] });
      res.redirect(`/order/success?orderId=${order._id}`);
      req.flash('success', 'You have ordered successfully');
    } catch (error) {
      req.flash('error', 'System error');
    }
  } else {
    req.flash('warming', 'Order failed');
    res.redirect('/');
  }
};

export const renderOrderSuccess = async (req: Request, res: Response) => {
  const { orderId } = req.query;

  const order = await OrderModel.findOne({ _id: orderId });

  const orderDate = moment(order.createdAt).format('Do MMMM YYYY');
  const shipDate = moment(order.createdAt)
    .add(3, 'days')
    .format('Do MMMM YYYY');

  res.render('client/pages/order/success', {
    title: 'Order | Confirm',
    orderData: order,
    orderDate,
    shipDate,
  });
};
