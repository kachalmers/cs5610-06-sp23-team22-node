import albumsModel from "./albums-model.js";

export const findAllAlbums = async () => {
    const albums = await albumsModel.find().populate('artists');
    return albums;
}

export const createAlbum = async (album) => {
    const newAlbum = await albumsModel.create(album);
    return newAlbum;
}

export const findAlbumBySpotifyId = async (stid) => {
    const album = await albumsModel.findOne({spotifyId:stid}).populate('artists');
    return album;
}

export const updateAlbum = async (stid,newAlbum) => {
    const status = await albumsModel.updateOne({spotifyId:stid},newAlbum);
    return status;
}