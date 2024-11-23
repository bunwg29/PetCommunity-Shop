import { Request, Response } from 'express';
import md5 from 'md5';

import AccountModel from '../../models/account.model';

import { systemConfig } from '../../config/adminPrefix';

// [GET] admin/user/signin
export const signin = async (req: Request, res: Response) => {
  res.render('admin/pages/auth/signin', {
    title: 'Admin | Signin',
  });
};

// [POST] admin/user/signin
export const signinPost = async (req: Request, res: Response) => {
  const errors: { [key: string]: string } = {};

  const userInfo = {
    email: req.body.email,
    deleted: false,
  };

  const user = await AccountModel.findOne(userInfo);

  if (!user) {
    errors.email = 'Not exist email';
    res.locals.errors = errors;
    res.render('admin/pages/auth/signin', {
      title: 'PetCommunity | SignIn',
      errors,
      user,
    });
    return;
  }

  if (md5(req.body.password) != user.password) {
    errors.password = 'Wrong password';
    res.locals.errors = errors;

    res.render('admin/pages/auth/signin', {
      title: 'PetCommunity | SignIn',
      errors,
    });

    return;
  }

  if (user && md5(req.body.password) === user.password) {
    res.cookie('tokenUser', user.tokenUser);
    req.flash('success', 'Login Success');
    res.redirect(`/${systemConfig.prefixAdmin}`);
  }
};

// [GET] /admin/logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie('tokenUser');
  req.flash('success', 'Logout success');
  res.redirect(`/${systemConfig.prefixAdmin}/signin`);
};
