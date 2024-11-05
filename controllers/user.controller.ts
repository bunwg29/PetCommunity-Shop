import { Response, Request } from "express";
import md5 from 'md5';
import UserModel from "../models/user.model";

import * as generateHelper from "../helpers/generateCode";


export const signin = async (req: Request, res: Response) => {
    
    res.render('pages/user/signin', {
        title: "PetCommunity | Signin"
    });

};

export const signup = async (req: Request, res: Response) => {
    
    const errors = res.locals.errors || null; 
    
    res.render('pages/user/signup', {
        title: "PetCommunity | SignUp",
        errors 
    });

};

export const signupPost = async (req: Request, res: Response) => {
 
    const userData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phonenumber,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30),
        linkFb: req.body.facebook_address
    };

    const newUser = new UserModel(userData);

    try {
        await newUser.save();
        res.redirect("/user/signin");
    } catch (error) {
        res.locals.errors = { general: "Register falied, try again!" };
        return res.redirect("/user/signup");
    }

};

