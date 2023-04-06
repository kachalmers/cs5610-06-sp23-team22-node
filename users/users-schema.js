import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstName: String,
        lastName: String,
        email: { type: String },
        role: { type: String, default: "USER", enum: ["ADMIN", "ARTIST", "USER"] },
    },
    {
        collection: "users",
    }
);
export default usersSchema;