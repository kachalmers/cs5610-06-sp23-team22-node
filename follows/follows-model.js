import mongoose from "mongoose";
import followsSchema from "./follows-schema.js";
const followsModel = mongoose.model("follows", followsSchema);
export default followsModel;