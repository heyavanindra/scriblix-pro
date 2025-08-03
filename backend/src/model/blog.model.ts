import mongoose, { Schema } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: [];
  des: string;
  featuredImage?: string;
  tags?: string[];
  slug: string;
  draft: boolean;
  author: mongoose.Schema.Types.ObjectId;
  activity: {
    total_likes: number;
    total_comments: number;
    total_reads: number;
  };
  comments:string[];
  publishedAt:Date,
  updatedAt:Date
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: [],
  },
  author: {
    required: true,
    ref: "User",
    type: Schema.Types.ObjectId,
  },
  draft: {
    type: Boolean,
  },
  des: {
    type: String,
    maxlength: 200,
  },
  featuredImage: {
    type: String,
    default:
      "https://www.gravatar.com/avatar/0000000000000000000000000000000?d=mp&f=y",
  },
  slug: {
    type: String,
    required: true,
    unique:true
  },
  tags: {
    type: [String],
    default: [],
  },
  activity: {
    total_likes: {
      type: Number,
      default: 0,
    },
    total_comments: {
      type: Number,
      default: 0,
    },
    total_reads: {
      type: Number,
      default: 0,
    },
  },
  comments:{
    type:[]
  },
  publishedAt:{
    type:Date,
    default:Date.now()
  },
  updatedAt:{
    type:Date,
    default:Date.now 
  }
});

const BlogModel = mongoose.model("Blog", blogSchema);

export { BlogModel };
