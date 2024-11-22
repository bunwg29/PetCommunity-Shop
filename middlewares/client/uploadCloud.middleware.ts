import { NextFunction, Request, Response } from 'express';
import { streamUpload } from '../../helpers/streamUpload.helper';

export const uploadSingle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req['file']) {
    const uploadToCloudinary = async (buffer: any) => {
      const result = await streamUpload(buffer);
      req.body[req['file'].fieldname] = result['url'];
      next();
    };

    uploadToCloudinary(req['file'].buffer);
  } else {
    next();
  }
};

export const uploadMultiple = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files) {
    try {
      const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
        streamUpload(file.buffer)
      );

      const results = await Promise.all(uploadPromises);

      req.body['images'] = results.map((result) => result['url']);

      next();
    } catch (error) {
      res.send('TOANG');
    }
  } else {
    next();
  }
};

export const uploadMultipeTypeForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files || {};
    const uploadedData: { avt?: string; images?: string[] } = {};

    if (files['avt'] && files['avt'].length > 0) {
      const avtResult = await streamUpload(files['avt'][0].buffer);
      uploadedData.avt = avtResult.url;
    }

    if (files['images'] && files['images'].length > 0) {
      const uploadPromises = files['images'].map((file: Express.Multer.File) =>
        streamUpload(file.buffer)
      );
      const imagesResults = await Promise.all(uploadPromises);
      uploadedData.images = imagesResults.map((result) => result.url);
    }

    req.body.uploadedData = uploadedData;

    next();
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Error uploading files to Cloudinary.',
      });
  }
};
