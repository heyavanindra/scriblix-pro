import express, { Request, Response } from "express";
import { signinSchema, signupSchema } from "../schema/schema";
import { type IUser, IUserType, UserModel } from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/middleware";

const authRoute = express.Router();

function formatDataToSend(user: IUserType) {
  return {
    profile_Image: user.personal_info.avatar,
    username: user.personal_info.username,
    email: user.personal_info.email,
  };
}

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
    let existingUser = await UserModel.findOne({
      "personal_info.username": parseData.data.username,
    });

    if (existingUser) {
      return res.status(403).json({
        message: "User already With This UserName Or Email",
        success: false,
      });
    }

    existingUser =await UserModel.findOne({
      "personal_info.email":parseData.data.email
    })

     if (existingUser) {
      return res.status(403).json({
        message: "User already With This UserName Or Email",
        success: false,
      });
    }



    const { username, email, password } = parseData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserModel.create({
      personal_info: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const savedUser = await createdUser.save();

    return res.status(201).json({
      message: "User created",
      success: true,
      user: formatDataToSend(savedUser),
    });
  } catch (error) {
    console.error(error);
    return res.status(503).json({
      message: "Error in Signup route",
      success: false,
    });
  }
});

authRoute.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const parseData = signinSchema.safeParse(body);
  if (!parseData.success) {
    return res.status(403).json({
      message: "Invalid credentials",
      success: false,
    });
  }

  try {
    const existingUser = await UserModel.findOne({
      "personal_info.username": parseData.data.username,
    });
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(
      parseData.data.password,
      existingUser.personal_info.password
    );
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid password",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.personal_info.username,
      },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error in Login route",
      success: false,
    });
  }
});

export default authRoute;

authRoute.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching user",
      success: false,
    });
  }
});
