import cloudinary from "../config/cloudinary.js";

export const uploadImage = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    upload.end(fileBuffer);
  });
};

export const uploadFoodImage = async (fileBuffer, folder = "FoodItems") => {
  return await uploadImage(fileBuffer, folder);
};
export const uploadUserImage = async (fileBuffer, folder = "userImages") => {
  return await uploadImage(fileBuffer, folder);
};
