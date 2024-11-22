import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {

    res.render("admin/pages/setting/index", {
        title: "Admin | Role"
    });
    
};