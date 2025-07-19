import { Request } from "express";
import "jsonwebtoken";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      username: string;
      userId: mongoose.Schema.Types.ObjectId; 
    }
  }
}
