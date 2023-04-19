import commentsModel from "./comments-model.js";

export const findAllComments = async () => {
    const comments = await commentsModel.find();
    return comments;
}

export const createComment = async (comment) => {
    const newComment = await commentsModel.create(comment);
    return newComment;
}

export const findCommentsByUserId = async (id) => {
    const comments = await commentsModel.find({userId:id});
    return comments;
}

export const findCommentsByArtistId = async (id) => {
    const comments = await commentsModel.find({artistId:id});
    return comments;
}

export const findCommentsByAlbumId = async (id) => {
    const comments = await commentsModel.find({albumId:id});
    return comments;
}

export const findCommentsByTrackId = async (id) => {
    const comments = await commentsModel.find({trackId:id});
    return comments;
}

export const findCommentsByLikeId = async (id) => {
    const comments = await commentsModel.find({likeId:id});
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