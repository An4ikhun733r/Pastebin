import mongoose from "mongoose";
import shortid from "shortid";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },  
    tags: { type: Array, default: [] },
    text: {
      type: String,
      required: true,
    },
    imageUrl: String,
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shortUrl: {
      type: String,
      default: shortid.generate,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
