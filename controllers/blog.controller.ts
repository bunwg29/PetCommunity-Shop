import { Request, Response } from "express";


export const index = async (req: Request, res: Response) => {

    res.render("pages/blog/index", {
        title: "PetCommunity | Blog"
    });
    
};
