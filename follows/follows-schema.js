import mongoose from "mongoose";
const followsSchema = new mongoose.Schema(
    {
        followerId: String,
        followeeId: String,
    },
    { collection: "follows" }
);
export default followsSchema;