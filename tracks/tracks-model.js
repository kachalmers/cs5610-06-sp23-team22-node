import mongoose from "mongoose";
import tracksSchema from "./tracks-schema.js";
const tracksModel = mongoose.model("tracks",tracksSchema);
export default tracksModel;