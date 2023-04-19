import likesModel from "./likes-model.js";

export const userLikesTrack = async (userId, trackId) => {
    return likesModel.create({ userId:userId, trackId:trackId });
};

export const userLikesAlbum = async (userId, albumId) => {
    return likesModel.create({ userId:userId, albumId:albumId });
};

export const userLikesArtist = async (userId, artistId) => {
    return likesModel.create({ userId:userId, artistId:artistId });
};

export const userUnlikesTrack = async (userId, trackId) => {
    return likesModel.deleteOne({ userId:userId, trackId:trackId });
};

export const userUnlikesAlbum = async (userId, albumId) => {
    return likesModel.deleteOne({ userId:userId, albumId:albumId });
};

export const userUnlikesArtist = async (userId, artistId) => {
    return likesModel.deleteOne({ userId:userId, artistId:artistId });
};

export const findAllLikes = async () => {
    const likes = await likesModel.find().populate([
        { path: "trackId", populate: { path: "artists" } },
        { path: "albumId", populate: { path: "artists" } },
        { path: "artistId" },
        { path: "userId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1 } }
    ]);
    return likes;
};

export const findLikeByUserAndTrack = async (userId, trackId) => {
    return likesModel.findOne({userId:userId, trackId:trackId});
};

export const findLikeByUserAndAlbum = async (userId, albumId) => {
    return likesModel.findOne({userId:userId, albumId:albumId});
};

export const findLikeByUserAndArtist = async (userId, artistId) => {
    return likesModel.findOne({userId:userId, artistId:artistId});
};

export const findTrackLikesByUserId = async (userId) => {
    return likesModel.find({userId:userId, trackId: { $exists: true } }).populate([
        { path: "trackId", populate: { path: "artists" } },
        { path: "userId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1 } }
    ]);
};

export const findLikesByUserIds = async (userIds) => {
    return likesModel.find({userId: {"$in":userIds}}).populate([
        { path: "trackId", populate: { path: "artists" } },
        { path: "albumId", populate: { path: "artists" } },
        { path: "artistId" },
        { path: "userId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1 } }
    ]);
};