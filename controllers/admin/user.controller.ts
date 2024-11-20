import { Request, Response } from "express";
import AccountModel from "../../models/account.model";
import moment from "moment";
import md5 from "md5";
import { systemConfig } from "../../config/adminPrefix";


// [GET] admin/user
export const index = async ( req: Request, res: Response ) => {

    const userInfo = await AccountModel.find();

    const user = userInfo.map(item => ({
        ...item.toObject(), 
        dateJoin: moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss"), 
        dateBirth: moment(item.dateBirth).local().format("DD/MM/YYYY")
    }));

    res.render("admin/pages/user/index", {
        title: "Admin | Account",
        user
    });

};


// [GET] admin/user/detail:id
export const detail = async (req: Request, res: Response) => {

    const idUser = req.params.id;

    const userInfo = await AccountModel.findOne({ _id: idUser });

    userInfo.dateBirth = moment(userInfo.dateBirth).format("YYYY-MM-DD");

    res.render("admin/pages/user/edit", {
        title: "Admin | UserInfo",
        userInfo
    });

};

// [PATCH] admin/user/detail/:id
export const detailPatch = async (req: Request, res: Response) => {

    await AccountModel.updateOne(
        {
          _id: req.params.id,
          deleted: false,
        },
        req.body
    );

    res.redirect(`/${systemConfig.prefixAdmin}/user`);

};

// [DELETE] admin/user/delete/:id
export const deleteUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    await AccountModel.deleteOne({
        _id: id
    });

    res.json({
        code: 200
    });

};
