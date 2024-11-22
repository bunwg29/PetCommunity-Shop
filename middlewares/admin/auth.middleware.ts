import { Request, Response, NextFunction } from "express";
import AccountModel from "../../models/account.model";
import { systemConfig } from "../../config/adminPrefix";
import RoleModel from "../../models/roles.model";

export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  
    if (!req.cookies.tokenUser) {
  
      res.redirect(`/${systemConfig.prefixAdmin}/signin`);
      return;
  
    }
  
    const account = await AccountModel.findOne({
  
      tokenUser: req.cookies.tokenUser, 
      deleted: false
  
    }).select('role_id name _id');

  
    if (!account) {
        res.redirect(`/${systemConfig.prefixAdmin}/signin`);
        return;
    };

    const roleAdmin = await RoleModel.findOne({
      _id: account.role_id
    }).select("title permission").lean();

    if(!roleAdmin) {
      res.redirect(`/signin`);
      return;
    }

    res.locals.roles = roleAdmin;
    res.locals.account = account;
  
    next();
  
};
  