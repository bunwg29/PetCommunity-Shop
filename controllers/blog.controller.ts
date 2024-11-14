import { Request, Response } from "express";
import BlogModel from "../models/blog.model";


export const index = async (req: Request, res: Response) => {

    const find = {
        deleted: false
    };

    const blogInfo = await BlogModel.find(find);
    
    res.render("pages/blog/index", {
        title: "PetCommunity | Blog",
        blogInfo
    });
    
};

export const createBlog = async (req: Request, res: Response) => {

    res.render("pages/blog/create", {
        title: "Create Blog",
    });
    
};

export const createBlogPost = async (req: Request, res: Response) => {  

    const id_blogger = req.params.id;

    const newBlogData = {
        thumbnail_photo: req.body.thumbnail_photo,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        uploadBy: req.body.uploadBy,
        id_blogger: id_blogger,
    }
    
    const newBlog = new BlogModel(newBlogData);

    try {

        await newBlog.save();
        res.redirect("/blog");

    } catch (error) {
        
        res.send("update failed");

    }
    
};

export const blogDetail = async (req: Request, res: Response) => {

    const blogId = req.params.id;

    const blogDetailInfo = await BlogModel.findOne({_id: blogId});
    
    res.render("pages/blog/blogDetail", {
        title: "PetCommunity | Blog Detail",
        blogDetailInfo
    });
    
};

export const myBlog = async (req: Request, res: Response) => {

    const id_blogger = req.params.id;
    
    const myBlog = await BlogModel.find({
        id_blogger: id_blogger,
    });

    res.render("pages/blog/myblog", {
        title: "PetC | MyBlog",
        myBlog
    });

};

export const edit = async (req: Request, res: Response) => {

    const id = req.params.id;

    const blogData = await BlogModel.findOne({
        _id: id
    });

    res.render("pages/blog/edit", {
        title: "PetCommunity | Blog Edit",
        blogData
    });
    
};

export const editPatch = async (req: Request, res: Response) => {
    
    const id_blog = req.params.id;

    const newBlogData = {
        thumbnail_photo: req.body.thumbnail_photo,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        uploadBy: req.body.uploadBy,
    }
    
    
    try {

        await BlogModel.updateOne( { _id: id_blog }, newBlogData );

        res.redirect("/blog");

    } catch (error) {
        
        res.send("update failed");

    }
    
};
