import * as likesDao from "./likes-dao.js";
import * as tracksDao from "../tracks/tracks-dao.js";
import * as followsDao from "../follows/follows-dao.js";

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

    const findLikesByUserId = async (req,res) => {
        const like = await likesDao.findLikesByUserId(req.params.userId);
        res.json(like);
    }

    const findLikesOfUserFollowees = async (req,res) => {
        // Find given user's followees
        let followsWithUserFollowees = await followsDao.findFolloweesByUserId(req.params.userId);
        let followees = followsWithUserFollowees.map(follow => follow.followeeId);
        const likesOfUserFollowees = await likesDao.findLikesByUserIds(followees);
        res.json(likesOfUserFollowees);
    }

    const toggleLike = async (req,res) => {
        const userId = req.params.userId;
        const spotifyTrackId = req.params.spotifyTrackId;

        // Find if track exists in database
        let track = await tracksDao.findTrackBySpotifyId(spotifyTrackId);

        // If track doesn't exist in our db yet
        if (track === null) {
            // Create track
            track = await tracksDao.createTrack(req.body);
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

    app.put("/api/users/:userId/likes/:spotifyTrackId",toggleLike);
    app.get("/api/likes",findAllLikes);
    app.get("/api/users/:userId/likes", findLikesByUserId);
    app.get("/api/users/:userId/followees/likes",findLikesOfUserFollowees)
    app.post("/api/users/:userId/likes/:trackId", userLikesTrack);
    app.delete("/api/users/:userId/likes/:trackId", userUnlikesTrack);
};
export default LikesController;