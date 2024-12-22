import { Request, Response } from 'express';
import moment from 'moment';

import ToyOrderModel from '../../models/toyOrder.model';

import { Pagination } from '../../helpers/pagination.helper';
import { systemConfig } from '../../config/adminPrefix';
import { sendEmail } from '../../helpers/sendMail.helper';

export const index = async (req: Request, res: Response) => {
  const pagination = await Pagination(req, ToyOrderModel, {});

  const order = await ToyOrderModel.find()
    .limit(pagination.limitItems)
    .skip(pagination.skip);
  const orderInfo = order.map((item) => ({
    ...item.toObject(),
    createDate: moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss'),
  }));

  res.render('admin/pages/orderToyPet/index', {
    title: 'Order | FoodPet',
    orderInfo,
    pagination,
  });
};

export const detail = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  const orderDetail = await ToyOrderModel.findOne({ _id: orderId });

  const orderDate = moment(orderDetail.createdAt).format('Do MMMM YYYY');
  const shipDate = moment(orderDetail.createdAt)
    .add(3, 'days')
    .format('Do MMMM YYYY');

  res.render('admin/pages/orderToyPet/detail', {
    title: 'Order | Detail',
    orderDetail,
    orderDate,
    shipDate,
  });
};

export const confirmOrder = async (req: Request, res: Response) => {
  const email = req.params.email;
  const orderId = req.params.id;

  const subject = 'CONFIRM ORDER';
  const htmlSendMail = `Your order #${orderId} has been confirmed by us. This package will be sent to you according to the plan`;
  sendEmail(email, subject, htmlSendMail);

  const order = await ToyOrderModel.updateOne(
    { _id: orderId },
    { status: 'Confirmed' }
  );

  if (order) {
    req.flash('success', 'This order has been confirmed');
    res.redirect(`/${systemConfig.prefixAdmin}/ordertoypet`);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  const order = await ToyOrderModel.findByIdAndDelete(orderId);

  if (order) {
    res.json({
      code: 200,
    });

    req.flash('success', 'Delete order success');
  }
};
