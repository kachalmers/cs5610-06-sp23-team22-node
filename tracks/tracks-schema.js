import mongoose from "mongoose";
const tracksSchema = new mongoose.Schema(
    {
        spotifyId: String,
        name: String,
        album: String,
        artist: String,
        imageUrl: String,
        likes: {type: Number, default: 0}
    },
    {
        collection: "tracks",
    }
);
export default tracksSchema;