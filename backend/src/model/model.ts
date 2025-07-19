import mongoose from "mongoose";

enum BlogRole {
  EDITOR = "editor",
  USER = "user",
}

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  bio?: string;
  role: BlogRole;
  avatar?: string;
  blogs: mongoose.Types.ObjectId[];
}

interface IBlog extends Document {
  title: string;
  content: string;
  featuredImage?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  likes: number;
  comments?: string[];

  author: mongoose.Schema.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
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
  },
  role: {
    type: String,
    enum: Object.values(BlogRole),
    default: BlogRole.USER,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const blogSchema = new mongoose.Schema<IBlog>({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  featuredImage: {
    type: String,
    default:
      "https://www.gravatar.com/avatar/0000000000000000000000000000000?d=mp&f=y",
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);
const BlogModel = mongoose.model("Blog", blogSchema);

export { UserModel, BlogModel };
