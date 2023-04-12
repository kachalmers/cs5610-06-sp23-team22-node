import tracksModel from "./tracks-model.js";

export const findAllTracks = async () => {
    const tracks = await tracksModel.find();
    return tracks;
}

export const createTrack = async (track) => {
    const newTrack = await tracksModel.create(track);
    return newTrack;
}

export const findTrackBySpotifyId = async (stid) => {
    const track = await tracksModel.findOne({spotifyId:stid});
    return track;
}

export const updateTrack = async (stid,newTrack) => {
    const status = await tracksModel.updateOne({spotifyId:stid},newTrack);
    return status;
}