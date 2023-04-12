import mongoose, {Schema} from "mongoose";
const followsSchema = new mongoose.Schema(
    {
        followerId: {type: Schema.Types.ObjectId, ref: 'users'},
        followeeId: {type: Schema.Types.ObjectId, ref: 'users'}
    },
    { collection: "follows" }
);
export default followsSchema;