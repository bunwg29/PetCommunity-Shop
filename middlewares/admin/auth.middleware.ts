import { Request, Response, NextFunction } from "express";
import AccountModel from "../../models/account.model";
import { systemConfig } from "../../config/adminPrefix";

export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  
    if (!req.cookies.tokenUser) {
  
      res.redirect(`/${systemConfig.prefixAdmin}/signin`);
      return;
  
    }
  
    const account = await AccountModel.findOne({
  
      tokenUser: req.cookies.tokenUser, 
      deleted: false
  
    });
  
    if (!account) {
        res.redirect(`/${systemConfig.prefixAdmin}/signin`);
        return;
    }
  
    next();
  
  };
  