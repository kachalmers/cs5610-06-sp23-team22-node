import likesModel from "./likes-model.js";

export const userLikesTrack = async (userId, trackId) => {
    return likesModel.create({ userId:userId, trackId:trackId });
};

export const userUnlikesTrack = async (userId, trackId) => {
    return likesModel.deleteOne({ userId:userId, trackId:trackId });
};

export const findAllLikes = async () => {
    const likes = await likesModel.find().populate('userId trackId');
    return likes;
};

export const findLikeByUserAndTrack = async (userId, trackId) => {
    return likesModel.findOne({userId:userId, trackId:trackId});
};

export const findLikesByUserId = async (userId) => {
    return likesModel.find({userId:userId}).populate('userId trackId');
};

export const findLikesByUserIds = async (userIds) => {
    return likesModel.find({userId: {"$in":userIds}}).populate('userId trackId');
};