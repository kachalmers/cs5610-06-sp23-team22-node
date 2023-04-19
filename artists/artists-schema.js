import mongoose from "mongoose";
const artistsSchema = new mongoose.Schema(
    {
        spotifyId: String,
        name: String,
        imageUrl: String,
        likes: {type: Number, default: 0},
        likedByMe: {type: Boolean, default: false}
    },
    {
        collection: "artists",
    }
);
export default artistsSchema;