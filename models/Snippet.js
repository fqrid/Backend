import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  language: String,
  code: {
    type: String,
    required: true,
  },
  tags: [String],
}, { timestamps: true });

export default mongoose.model("Snippet", snippetSchema);