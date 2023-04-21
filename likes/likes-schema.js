import mongoose, {Schema} from "mongoose";
const likesSchema = new mongoose.Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: 'users'},
        trackId: {type: Schema.Types.ObjectId, ref: 'tracks'},
        albumId: {type: Schema.Types.ObjectId, ref: 'albums'},
        artistId: {type: Schema.Types.ObjectId, ref: 'artists'},
        date: {type: Date, default: Date.now},
        text: {type: String, default:''}
    },
    { collection: "likes" }
);
export default likesSchema;