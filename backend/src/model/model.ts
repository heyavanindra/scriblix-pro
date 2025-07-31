import mongoose from "mongoose";


interface IBlog extends Document {
  title: string;
  content: string;
  featuredImage?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  likes: number;
  comments?: string[];
  slug: string;
  author: mongoose.Schema.Types.ObjectId;
}


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
  slug: {
    type: String,
    required: true,
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

const BlogModel = mongoose.model("Blog", blogSchema);

export {  BlogModel };
