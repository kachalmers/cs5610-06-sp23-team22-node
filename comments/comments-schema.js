import mongoose, {Schema} from "mongoose";
const commentsSchema = new mongoose.Schema(
    {
        artistId: {type: Schema.Types.ObjectId, ref: 'artists'},
        albumId: {type: Schema.Types.ObjectId, ref: 'albums'},
        trackId: {type: Schema.Types.ObjectId, ref: 'tracks'},
        likeId: {type: Schema.Types.ObjectId, ref: 'likes'},
        userId: {type: Schema.Types.ObjectId, ref: 'users'},
        text: String,
        date: {type: Date, default: Date.now}
    },
    {
        collection: "comments",
    }
);
export default commentsSchema;