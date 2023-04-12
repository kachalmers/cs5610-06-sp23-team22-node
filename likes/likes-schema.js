import mongoose, {Schema} from "mongoose";
const likesSchema = new mongoose.Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: 'users'},
        trackId: {type: Schema.Types.ObjectId, ref: 'tracks'}
    },
    { collection: "likes" }
);
export default likesSchema;