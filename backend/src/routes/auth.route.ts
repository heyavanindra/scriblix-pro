import express, { Request, Response } from "express";
import { signinSchema, signupSchema } from "../schema/schema";
import { UserModel } from "../model/model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRoute = express.Router();

authRoute.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  const parseData = signupSchema.safeParse(body);
  if (!parseData.success) {
    return res.status(400).json({
      message: parseData.error.message || "Invalid Credentials",
      success: false,
      error: parseData.error.message,
    });
  }

  try {
    const existingUser = await UserModel.findOne({
      username: parseData.data.username,
    });

    if (existingUser) {
      return res
        .json({
          message: "User already Exist",
          success: false,
        })
        .status(403);
    }
    const { username, email, password } = parseData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await createdUser.save();

    return res
      .json({
        message: "User created",
        success: true,
      })
      .status(201);
  } catch (error) {
    console.log(error);
    return res
      .json({
        message: "Error in Signup route",
        success: false,
      })
      .status(503);
  }
});

authRoute.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const parseData = signinSchema.safeParse(body);
  if (!parseData.success) {
    return res
      .json({
        message: "Invalid credentials",
        success: false,
      })
      .status(403);
  }

  try {
    const existingUser = await UserModel.findOne({
      username: parseData.data.username,
    });
    if (!existingUser) {
      return res
        .json({
          message: "User does not exist",
          success: false,
        })
        .status(404);
    }
    const isPasswordValid = await bcrypt.compare(
      parseData.data.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res
        .json({
          message: "Invalid password",
          success: false,
        })
        .status(403);
    }
    const token = jwt.sign(
      { userId: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1h" }
    );
    return res
      .json({
        message: "Login successful",
        success: true,
        token: token,
      })
      .status(200);
  } catch (error) {
    console.log(error);
    return res
      .json({
        message: "Error in Login route",
        success: false,
      })
      .status(503);
  }
});

export default authRoute;
