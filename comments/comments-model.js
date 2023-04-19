import mongoose from "mongoose";
import commentsSchema from "./comments-schema.js";
const commentsModel = mongoose.model("comments",commentsSchema);
export default commentsModel;