import mongoose, {Schema} from "mongoose";
const likesSchema = new mongoose.Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: 'users'},
        trackId: {type: Schema.Types.ObjectId, ref: 'tracks'},
        albumId: {type: Schema.Types.ObjectId, ref: 'albums'},
        artistId: {type: Schema.Types.ObjectId, ref: 'artists'}
    },
    { collection: "likes" }
);
export default likesSchema;