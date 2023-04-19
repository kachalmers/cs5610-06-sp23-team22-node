import artistsModel from "./artists-model.js";

export const findAllArtists = async () => {
    const artists = await artistsModel.find();
    return artists;
}

export const createArtist = async (artist) => {
    const newArtist = await artistsModel.create(artist);
    return newArtist;
}

export const findArtistBySpotifyId = async (stid) => {
    const artist = await artistsModel.findOne({spotifyId:stid});
    return artist;
}

export const updateArtist = async (stid,newArtist) => {
    const status = await artistsModel.updateOne({spotifyId:stid},newArtist);
    return status;
}