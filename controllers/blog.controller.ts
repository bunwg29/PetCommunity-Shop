import { Request, Response } from "express";
import BlogModel from "../models/blog.model";


export const index = async (req: Request, res: Response) => {

    res.render("pages/blog/index", {
        title: "PetCommunity | Blog"
    });
    
};

export const createBlog = async (req: Request, res: Response) => {

    res.render("pages/blog/create", {
        title: "Create Blog"
    });
    
};

export const createBlogPost = async (req: Request, res: Response) => {  
        
    const newBlog = new BlogModel(req.body);

    try {

        await newBlog.save();
        res.redirect("/blog");

    } catch (error) {
        
        res.send("update failed");

    }
    

};