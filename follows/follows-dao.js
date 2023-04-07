import followsModel from "./follows-model.js";

export const userFollowsUser = async (followerId, followeeId) => {
    return followsModel.create({ followerId, followeeId });
};

export const userUnfollowsUser = async (followerId, followeeId) => {
    return followsModel.deleteOne({ followerId:followerId, followeeId:followeeId });
};

export const findAllFollows = async () => {
    const follows = await followsModel.find();
    return follows;
};

export const findFollowByUserIds = async (followerId,followeeId) => {
    return followsModel.findOne({followerId,followeeId});
};

export const findFolloweesByUserId = async (followerId) => {
    return followsModel.find({followerId});
};

export const findFollowersByUserId = async (followeeId) => {
    return followsModel.find({followeeId});
};