import * as likesDao from "./likes-dao.js";
import * as tracksDao from "../tracks/tracks-dao.js";
import * as albumsDao from "../albums/albums-dao.js";
import * as artistsDao from "../artists/artists-dao.js";
import * as followsDao from "../follows/follows-dao.js";
import * as helpers from "../helpers/helpers.js";

const LikesController = (app) => {
    const userLikesTrack = async (req, res) => {
        const userId = req.params.userId;
        const trackId = req.params.trackId;
        const like = await likesDao.userLikesTrack(userId, trackId);
        res.json(like);
    };
    const userUnlikesTrack = async (req,res) => {
        const status = await likesDao.userUnlikesTrack(req.params.userId, req.params.trackId);
        res.send(status);
    };
    const findAllLikes = async (req,res) => {
        const likes = await likesDao.findAllLikes();
        res.json(likes);
    }

    const findTrackLikesByUserId = async (req,res) => {
        const likes = await likesDao.findTrackLikesByUserId(req.params.userId);
        res.json(likes);
    }

    const findAlbumLikesByUserId = async (req,res) => {
        const likes = await likesDao.findAlbumLikesByUserId(req.params.userId);
        res.json(likes);
    }

    const findArtistLikesByUserId = async (req,res) => {
        const likes = await likesDao.findArtistLikesByUserId(req.params.userId);
        res.json(likes);
    }

    const findLikesOfUserFollowees = async (req,res) => {
        // Find given user's followees
        let followsWithUserFollowees = await followsDao.findFolloweesByUserId(req.params.userId);
        let followees = followsWithUserFollowees.map(follow => follow.followeeId);
        followees.push(req.params.userId);
        const likesOfUserFollowees = await likesDao.findLikesByUserIds(followees);
        res.json(likesOfUserFollowees);
    }

    const toggleTrackLike = async (req,res) => {
        const userId = req.params.userId;
        const spotifyTrackId = req.params.spotifyId;

        // Find if track exists in database
        let track = await tracksDao.findTrackBySpotifyId(spotifyTrackId);

        // If track doesn't exist in our db yet
        if (track === null) {
            // Create track
            track = await helpers.createTrackWithArtists(req.body);
        }

        // Find like between given user and track if it exists
        let like = await likesDao.findLikeByUserAndTrack(userId, track._id);

        // If like between user and track doesn't exist...
        if (like !== null) {
            // Delete like
            await likesDao.userUnlikesTrack(userId, track._id);
            track.likes--;
            await tracksDao.updateTrack(spotifyTrackId,track);
        } else {
            // Create like
            await likesDao.userLikesTrack(userId, track._id);
            track.likes++;
            await tracksDao.updateTrack(spotifyTrackId,track);
        }
        res.sendStatus(200);
    }

    const toggleAlbumLike = async (req,res) => {
        const userId = req.params.userId;
        const spotifyAlbumId = req.params.spotifyId;

        // Find if album exists in database
        let album = await albumsDao.findAlbumBySpotifyId(spotifyAlbumId);

        // If album doesn't exist in our db yet...
        if (album === null) {
            // Create album
            album = await helpers.createAlbumWithArtists(req.body);
        }

        // Find like between given user and album if it exists
        let like = await likesDao.findLikeByUserAndAlbum(userId, album._id);

        // If like between user and album doesn't exist...
        if (like !== null) {
            // Delete like
            await likesDao.userUnlikesAlbum(userId, album._id);
            album.likes--;
            await albumsDao.updateAlbum(spotifyAlbumId,album);
        } else {
            // Create like
            await likesDao.userLikesAlbum(userId, album._id);
            album.likes++;
            await albumsDao.updateAlbum(spotifyAlbumId,album);
        }
        res.sendStatus(200);
    }

    const toggleArtistLike = async (req,res) => {
        const userId = req.params.userId;
        const spotifyArtistId = req.params.spotifyId;

        // Find if artist exists in database
        let artist = await artistsDao.findArtistBySpotifyId(spotifyArtistId);

        // If artist doesn't exist in our db yet...
        if (artist === null) {
            // Create artist
            artist = await artistsDao.createArtist(req.body);
        }

        // Find like between given user and artist if it exists
        let like = await likesDao.findLikeByUserAndArtist(userId, artist._id);

        // If like between user and artist doesn't exist...
        if (like !== null) {
            // Delete like
            await likesDao.userUnlikesArtist(userId, artist._id);
            artist.likes--;
            await artistsDao.updateArtist(spotifyArtistId,artist);
        } else {
            // Create like
            await likesDao.userLikesArtist(userId, artist._id);
            artist.likes++;
            await artistsDao.updateArtist(spotifyArtistId,artist);
        }
        res.sendStatus(200);
    }

    const findTrackLikeByIds = async (req,res) => {
        const userId = req.params.userId;
        const spotifyTrackId = req.params.spotifyId;
        if (userId===undefined || spotifyTrackId===undefined) {
            res.json({})
        } else {
            // Find track in db
            let track = await tracksDao.findTrackBySpotifyId(spotifyTrackId);

            if (track) {
                // Find like by user and track ids
                let like = await likesDao.findLikeByUserAndTrack(userId,track._id)
                res.json(like);
            } else {
                res.json({});
            }
        }
    }

    const findArtistLikeByIds = async (req,res) => {
        const userId = req.params.userId;
        const spotifyArtistId = req.params.spotifyId;
        if (userId===undefined || spotifyArtistId===undefined) {
            res.json({})
        } else {
            // Find track in db
            let artist = await artistsDao.findArtistBySpotifyId(spotifyArtistId);

            if (artist) {
                // Find like by user and track ids
                let like = await likesDao.findLikeByUserAndArtist(userId,artist._id)
                res.json(like);
            } else {
                res.json({});
            }
        }
    }

    const findAlbumLikeByIds = async (req,res) => {
        const userId = req.params.userId;
        const spotifyAlbumId = req.params.spotifyId;
        if (userId===undefined || spotifyAlbumId===undefined) {
            res.json({})
        } else {
            // Find track in db
            let album = await albumsDao.findAlbumBySpotifyId(spotifyAlbumId);

            if (album) {
                // Find like by user and track ids
                let like = await likesDao.findLikeByUserAndAlbum(userId,album._id)
                res.json(like);
            } else {
                res.json({});
            }
        }
    }

    const updateLike = async (req,res) => {
        const id = req.params.likeId;
        const status = await likesDao.updateLike(id, req.body);
        res.json(status);
    }

    app.put("/api/users/:userId/likes/tracks/:spotifyId",toggleTrackLike);
    app.put("/api/users/:userId/likes/albums/:spotifyId",toggleAlbumLike);
    app.put("/api/users/:userId/likes/artists/:spotifyId",toggleArtistLike);
    app.get("/api/likes",findAllLikes);
    app.get("/api/users/:userId/likes/tracks", findTrackLikesByUserId);
    app.get("/api/users/:userId/likes/tracks/:spotifyId", findTrackLikeByIds);
    app.get("/api/users/:userId/likes/albums/:spotifyId", findAlbumLikeByIds);
    app.get("/api/users/:userId/likes/artists/:spotifyId", findArtistLikeByIds);
    app.get("/api/users/:userId/likes/albums", findAlbumLikesByUserId);
    app.get("/api/users/:userId/likes/artists", findArtistLikesByUserId);
    app.get("/api/users/:userId/followees/likes",findLikesOfUserFollowees);
    app.post("/api/users/:userId/likes/:trackId", userLikesTrack);
    app.delete("/api/users/:userId/likes/:trackId", userUnlikesTrack);
    app.put("/api/likes/:likeId",updateLike);
};
export default LikesController;