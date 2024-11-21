import { Request, Response, NextFunction } from 'express'
import AccountModel from '../../models/account.model'

export const setUserInfo = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.cookies.tokenUser

  if (token) {

    const user = await AccountModel.findOne({ tokenUser: token })

    if (user) { res.locals.user = user; }

  }

  next();

};

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  
  if (!req.cookies.tokenUser) {

    res.redirect("/user/signin")
    return;

  }

  const account = await AccountModel.findOne({

    tokenUser: req.cookies.tokenUser, 
    deleted: false

  });

  if (!account) {

    res.redirect("/user/signin")
    return;

  }

  next();

};


