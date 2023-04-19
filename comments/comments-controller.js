import * as commentsDao from "./comments-dao.js";
import * as tracksDao from "../tracks/tracks-dao.js";
import * as albumsDao from "../albums/albums-dao.js";
import * as artistsDao from "../artists/artists-dao.js";
import * as helpers from "../helpers/helpers.js";

const CommentsController = (app) => {
    /**
     * We want...
     *  - the whole track, artist, or album object (body)
     *  - userId (params)
     *  - text (body)
     */
    /*
    req.body:
    {
        text: String,
        commentedTrack: {
            spotifyId: String,
            name: String,
            artists: [
                {
                    spotifyId: String,
                    name: String,
                    image: String
                }
            ],
            imageUrl: String
        }
    }

    To give to dao:
     {
        text: String,
        userId:
        _Id: _
     }
     */
    const userCommentsOnTrack = async (req, res) => {
        const trackToComment = req.body.commentedTrack;
        const commentText = req.body.commentText;
        const userId = req.params.userId;

        // Find track if it exists
        let track = tracksDao.findTrackBySpotifyId(trackToComment.spotifyId);

        // If track doesn't exist
        if (!track) {
            // Create track and its artists
            track = helpers.createTrackWithArtists(trackToComment);
        }

        const buildComment = {
            userId: userId,
            text: commentText,
            trackId: track._id
        }
        const comment = await commentsDao.createComment(buildComment);
        res.json(comment);
    };

    const userCommentsOnAlbum = async (req, res) => {

    }

    const userCommentsOnArtist = async (req, res) => {

    }

    const userCommentsOnLike = async (req, res) => {

    }

    const findAllComments = async (req,res) => {
        const comments = await commentsDao.findAllComments();
        res.json(comments);
    }

    const findCommentsByUserId = async (req,res) => {
        const comment = await commentsDao.findCommentsByUserId(req.params.userId);
        res.json(comment);
    }

    app.get("/api/comments",findAllComments);
/*    app.get("/api/artists/:spotifyId/comments",findAllArtistComments);
    app.get("/api/albums/:spotifyId/comments",findAllAlbumComments);
    app.get("/api/tracks/:spotifyId/comments",findAllTrackComments);
    app.get("/api/likes/:likeId/comments",findAllLikeComments);*/
    app.get("/api/users/:userId/comments", findCommentsByUserId);
/*
    app.get("/api/users/:userId/followees/comments",findCommentsOfUserFollowees);
*/
    app.post("/api/users/:userId/comments/artists/:spotifyId", userCommentsOnArtist);
    app.post("/api/users/:userId/comments/albums/:spotifyId", userCommentsOnAlbum);
    app.post("/api/users/:userId/comments/tracks/:spotifyId", userCommentsOnTrack);
    app.post("/api/users/:userId/comments/likes/:spotifyId", userCommentsOnLike);
};
export default CommentsController;