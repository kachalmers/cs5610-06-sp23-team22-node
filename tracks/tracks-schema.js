import mongoose, {Schema} from "mongoose";
const tracksSchema = new mongoose.Schema(
    {
        spotifyId: String,
        name: String,
        artists: [{type: Schema.Types.ObjectId, ref: 'artists'}],
        imageUrl: String,
        likes: {type: Number, default: 0},
        likedByMe: {type: Boolean, default: false}
    },
    {
        collection: "tracks",
    }
);
export default tracksSchema;