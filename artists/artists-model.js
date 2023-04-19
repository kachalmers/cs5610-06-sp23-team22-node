import mongoose from "mongoose";
import artistsSchema from "./artists-schema.js";
const artistsModel = mongoose.model("artists",artistsSchema);
export default artistsModel;