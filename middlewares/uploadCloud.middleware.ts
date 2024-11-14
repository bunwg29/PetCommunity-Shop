import { NextFunction, Request, Response } from 'express'
import { streamUpload } from '../helpers/streamUpload.helper'

export const uploadSingle = ( req: Request, res: Response, next: NextFunction) => {

  if (req['file']) {

    const uploadToCloudinary = async (buffer: any) => {

      const result = await streamUpload(buffer)
      req.body[req['file'].fieldname] = result['url']
      next();

    } 

    uploadToCloudinary(req['file'].buffer);

  } else { next(); }

};

export const uploadMultiple = async (req: Request, res: Response, next: NextFunction) => {

  if (req.files) {
    try {
      
      const uploadPromises = (req.files as Express.Multer.File[]).map((file) => 
        streamUpload(file.buffer)
      );

      const results = await Promise.all(uploadPromises);
  
      req.body['images'] = results.map((result) => result['url']);
  
      next();

    } catch (error) {
      res.send("TOANG");
    }
  } else { next(); }

};

