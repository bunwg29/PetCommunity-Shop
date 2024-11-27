import { Request, Response } from 'express';
import ToyOrderModel from '../../models/toyOrder.model';
import moment from 'moment';
import ToyPetModel from '../../models/toyPet.model';
import ToyCartModel from '../../models/toyCart.model';

// [POST] order/create/:userId
export const createOrder = async (req: Request, res: Response) => {
  const cartToy = req.cookies.cartToy;
  const { totalPrice, ...userInfo } = req.body;

  const orderData = {
    userInfo: userInfo,
    products: [],
    totalPrice: totalPrice,
  };

  const cart = await ToyCartModel.findOne({ _id: cartToy });

  if (cart) {
    try {
      for (const item of cart.products) {
        const productInfo = await ToyPetModel.findOne({ _id: item.product_id });

        orderData.products.push({
          avt: productInfo.avt,
          name: productInfo.name,
          productId: item.product_id,
          price: productInfo.price,
          quantity: item.quantity,
        });
      }

      const order = new ToyOrderModel(orderData);
      await order.save();
      await ToyCartModel.updateOne({ _id: cartToy }, { products: [] });
      res.redirect(`/toyorder/success?orderId=${order._id}`);
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

  const order = await ToyOrderModel.findOne({ _id: orderId });

  const orderDate = moment(order.createdAt).format('Do MMMM YYYY');
  const shipDate = moment(order.createdAt)
    .add(3, 'days')
    .format('Do MMMM YYYY');

  res.render('client/pages/toyOrder/success', {
    title: 'Order | Confirm',
    orderData: order,
    orderDate,
    shipDate,
  });
};
