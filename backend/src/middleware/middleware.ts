import express from "express";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
      success: false,
    });
  }
  try {
   
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    );
    if (!decoded || typeof decoded !== "object" || !("username" in decoded)) {
      return res.status(403).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.username = (decoded as JwtPayload).username;
    req.userId = (decoded as JwtPayload).userId; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({
      message: "Invalid token",
      success: false,
    });
  }
};
