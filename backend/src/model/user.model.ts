import mongoose, { Mongoose } from "mongoose";

export interface IUser extends Document {
  personal_info: {
    email: string;
    username: string;
    password: string;
    bio?: string;
    avatar?: string;
    blogs: mongoose.Types.ObjectId[];
  };
  social_links: {
    youtube: string;
    instagram: string;
    github: string;
    website: string;
    twitter: string;
  };
  account_info: {
    total_post: number;
    total_reads: number;
  };
}

export type IUserType = IUser 

const userSchema = new mongoose.Schema<IUser>({
  personal_info: {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    email: {
      required: true,
      type: String,
      unique:true
    },
    password: {
      required: true,
      type: String,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [200, "Bio should not be more than 200"],
      default: "",
    },
  },
  social_links: {
    youtube: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
  },
  account_info: {
    total_post: {
      type: Number,
      default: 0,
    },
    total_reads: {
      type: Number,
      default: 0,
    },
  },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
