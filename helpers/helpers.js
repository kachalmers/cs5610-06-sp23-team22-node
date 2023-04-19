import * as artistsDao from "../artists/artists-dao.js";
import * as tracksDao from "../tracks/tracks-dao.js";
import * as albumsDao from "../albums/albums-dao.js";

/*
    track: {
        spotifyId: String,
        name: String,
        artists: [
            {
                spotifyId: String,
                name: String
            }
        ],
        imageUrl: String
    }
 */
export const createTrackWithArtists = async (track) => {
    // If track exists, return existing track
    const existingTrack = await tracksDao.findTrackBySpotifyId(track.spotifyId);

    if (existingTrack !== null) {
        return existingTrack;
    }

    // Create each artist if they don't yet exist in DB
    const artists = await Promise.all(track.artists.map(async (artist) => {
        let existingArtist = await artistsDao.findArtistBySpotifyId(artist.spotifyId);
        if (!existingArtist) {
            // Create artist
            return await artistsDao.createArtist(artist);
        } else {
            return existingArtist;
        }
    }))

    // Build track
    const trackToCreate = {
        spotifyId: track.spotifyId,
        name: track.name,
        artists: artists,
        imageUrl: track.imageUrl
    }

    // Create track
    return await tracksDao.createTrack(trackToCreate);
}

/*
    album: {
        spotifyId: String,
        name: String,
        artists: [
            {
                spotifyId: String,
                name: String
            }
        ],
        imageUrl: String
    }

    {

    }
 */
export const createAlbumWithArtists = async (album) => {
    // If album exists, return existing album
    const existingAlbum = await albumsDao.findAlbumBySpotifyId(album.spotifyId);

    if (existingAlbum !== null) {
        return existingAlbum;
    }

    // Create each artist if they don't yet exist in DB
    const artists = await Promise.all(album.artists.map(async (artist) => {
        let existingArtist = await artistsDao.findArtistBySpotifyId(artist.spotifyId);
        if (!existingArtist) {
            // Create artist
            return await artistsDao.createArtist(artist);
        } else {
            return existingArtist;
        }
    }))

    // Build album
    const albumToCreate = {
        spotifyId: album.spotifyId,
        name: album.name,
        artists: artists,
        imageUrl: album.imageUrl
    }

    // Create album
    return await albumsDao.createAlbum(albumToCreate);
}