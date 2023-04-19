import mongoose, {Schema} from "mongoose";
const albumsSchema = new mongoose.Schema(
    {
        spotifyId: String,
        name: String,
        artists: [{type: Schema.Types.ObjectId, ref: 'artists'}],
        imageUrl: String,
        likes: {type: Number, default: 0},
        likedByMe: {type: Boolean, default: false}
    },
    {
        collection: "albums",
    }
);
export default albumsSchema;