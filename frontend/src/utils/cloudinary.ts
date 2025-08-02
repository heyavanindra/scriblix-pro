import axios from "axios";
import type React from "react";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) {
    toast.error("Image Not Selected");
    throw new Error("No file Selected");
    
  }
  const loadingToast = toast.loading("uploading...");
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${API_URL}/image/upload`, formData);
  toast.dismiss(loadingToast);
  toast.success("Uploaded");
  return response.data.imageUrl;
};

export const uploadImageByUrl = (e:string) => {
  const link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (err) {
      reject(err);
    }
  });

  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

export const uploadImageByFile = async (e:File) => {
  if (!e) {
    toast.error("No Image Selected")
  }
  const formData = new FormData()
  formData.append("image",e)
  try {
    const response = await axios.post(`${API_URL}/image/upload`,formData)
    return {
      success:1,
      file:{
        url:response.data.imageUrl
      }
    }
  } catch (error) {
    toast.error("Error while uploading image")
    console.error(error)
  }
};
