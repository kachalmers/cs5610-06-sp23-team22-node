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
    return followsModel.findOne({followerId: followerId,followeeId: followeeId});
};

export const findFolloweesByUserId = async (followerId) => {
    return followsModel.find({followerId: followerId})
        .populate(
            { path: "followeeId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1, 'role':1 } }
        );
};

export const findFollowersByUserId = async (followeeId) => {
    return followsModel.find({followeeId: followeeId})
        .populate(
            { path: "followerId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1, 'role':1 } }
        );
};