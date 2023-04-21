import commentsModel from "./comments-model.js";

export const findAllComments = async () => {
    const comments = await commentsModel.find();
    return comments;
}

export const findCommentsByUserIds = async (userIds) => {
    return commentsModel.find({userId: {"$in":userIds}}).populate([
        { path: "trackId", populate: { path: "artists" } },
        { path: "albumId", populate: { path: "artists" } },
        { path: "artistId" },
        { path: "userId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1 } }
    ]);
}

export const createComment = async (comment) => {
    const newComment = await commentsModel.create(comment);
    return newComment;
}

export const findCommentsByUserId = async (id) => {
    return commentsModel.find({userId: id}).populate([
        { path: "trackId", populate: { path: "artists" } },
        { path: "albumId", populate: { path: "artists" } },
        { path: "artistId" },
        { path: "userId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1 } }
    ]);
}

export const findCommentsByArtistId = async (id) => {
    const comments = await commentsModel.find({artistId:id})
        .sort({date: -1})
        .populate({ path: "artistId" });
    return comments;
}

export const findCommentsByAlbumId = async (id) => {
    const comments = await commentsModel.find({albumId:id})
        .sort({date: -1})
        .populate([
            { path: "albumId", populate: { path: "artists" } },
            { path: "userId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1 } }
        ]);
    return comments;
}

export const findCommentsByTrackId = async (id) => {
    const comments = await commentsModel.find({trackId:id})
        .sort({date: -1})
        .populate([
            { path: "trackId", populate: { path: "artists" } },
            { path: "userId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1 } }
        ]);
    return comments;
}

export const findCommentsByLikeId = async (id) => {
    const comments = await commentsModel.find({likeId:id})
        .sort({date: -1})
        .populate(
            { path: "userId", select: { '_id':1, 'username':1, 'firstName':1, 'lastName':1 } }
        );
    return comments;
}

export const updateArtistComment = async (id,newComment) => {
    const status = await commentsModel.updateOne({artistId:id},newComment);
    return status;
}

export const updateAlbumComment = async (id,newComment) => {
    const status = await commentsModel.updateOne({albumId:id},newComment);
    return status;
}

export const updateTrackComment = async (id,newComment) => {
    const status = await commentsModel.updateOne({trackId:id},newComment);
    return status;
}

export const updateLikeComment = async (id,newComment) => {
    const status = await commentsModel.updateOne({likeId:id},newComment);
    return status;
}

export const deleteComment = async (id) => {
    const status = await commentsModel.deleteOne({_id:id});
    return status;
}