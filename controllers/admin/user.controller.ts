import { Request, Response } from 'express';
import AccountModel from '../../models/account.model';
import moment from 'moment';
import md5 from 'md5';
import { systemConfig } from '../../config/adminPrefix';
import RoleModel from '../../models/roles.model';

import { Pagination } from '../../helpers/pagination.helper';

// [GET] admin/user
export const index = async (req: Request, res: Response) => {
  const pagination = await Pagination(req, AccountModel, {});

  const userInfo = await AccountModel.find({
    _id: { $ne: res.locals.account._id },
  })
    .limit(pagination.limitItems)
    .skip(pagination.skip);

  const user = userInfo.map((item) => ({
    ...item.toObject(),
    dateJoin: moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss'),
    dateBirth: moment(item.dateBirth).local().format('DD/MM/YYYY'),
  }));

  res.render('admin/pages/user/index', {
    title: 'Admin | Account',
    user,
    pagination,
  });
};

// [GET] admin/user/detail:id
export const detail = async (req: Request, res: Response) => {
  const idUser = req.params.id;

  const userInfo = await AccountModel.findOne({ _id: idUser });
  userInfo.dateBirth = moment(userInfo.dateBirth).format('YYYY-MM-DD');

  const role = await RoleModel.findOne({ _id: userInfo.role_id })
    .select('permission')
    .lean();

  let id_role = null;

  if (res.locals.roles.permission.includes('all')) {
    id_role = await RoleModel.find({ title: { $ne: 'Admin' } }).select('_id');
  }

  res.render('admin/pages/user/edit', {
    title: 'Admin | UserInfo',
    userInfo,
    role: role ? role : '',
    id_role: id_role,
  });
};

// [PATCH] admin/user/detail/:id
export const detailPatch = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-user')) {
    await AccountModel.updateOne(
      {
        _id: req.params.id,
        deleted: false,
      },
      req.body
    );

    res.redirect(`/${systemConfig.prefixAdmin}/user`);
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [DELETE] admin/user/delete/:id
export const deleteUser = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-user')) {
    const id = req.params.id;

    await AccountModel.deleteOne({
      _id: id,
    });

    res.json({
      code: 200,
    });
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};
