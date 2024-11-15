import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

type CloudinaryUploadResult = {
  url: string;
  public_id: string; 
};

export const streamUpload = (buffer: any): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'PetCommunity',
      },
      (error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )
    streamifier.createReadStream(buffer).pipe(stream)
  })
}
