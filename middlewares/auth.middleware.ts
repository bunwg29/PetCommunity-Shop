import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'

export const setUserInfo = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.cookies.tokenUser

  if (token) {

    const user = await UserModel.findOne({ tokenUser: token })

    if (user) { res.locals.user = user; }

  }

  next();

};


