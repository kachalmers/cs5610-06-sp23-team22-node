import * as commentsDao from "./comments-dao.js";
import * as tracksDao from "../tracks/tracks-dao.js";
import * as albumsDao from "../albums/albums-dao.js";
import * as artistsDao from "../artists/artists-dao.js";
import * as helpers from "../helpers/helpers.js";
import * as followsDao from "../follows/follows-dao.js";

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
        const commentedTrack = req.body.track;
        const commentText = req.body.text;
        const userId = req.params.userId;
        const spotifyTrackId = req.params.spotifyId;

        // Find track if it exists
        let track = await tracksDao.findTrackBySpotifyId(spotifyTrackId);

        // If track doesn't exist
        if (track===null) {
            // Create track and its artists
            track = await helpers.createTrackWithArtists(commentedTrack);
        }

        const comment = {
            userId: userId,
            text: commentText,
            trackId: track._id
        }
        const newComment = await commentsDao.createComment(comment);
        res.json(newComment);
    };

    const userCommentsOnAlbum = async (req, res) => {
        const commentedAlbum = req.body.album;
        const commentText = req.body.text;
        const userId = req.params.userId;
        const spotifyAlbumId = req.params.spotifyId;

        // Find album if it exists
        let album = await albumsDao.findAlbumBySpotifyId(spotifyAlbumId);

        // If album doesn't exist
        if (album===null) {
            // Create album and its artists
            album = await helpers.createAlbumWithArtists(commentedAlbum);
        }

        const comment = {
            userId: userId,
            text: commentText,
            albumId: album._id
        }
        const newComment = await commentsDao.createComment(comment);
        res.json(newComment);
    };

    const userCommentsOnArtist = async (req, res) => {
        const commentedArtist = req.body.artist;
        const imageUrl = commentedArtist.imageUrl;

        const commentText = req.body.text;

        const userId = req.params.userId;
        const spotifyArtistId = req.params.spotifyId;

        // Find artist if it exists
        let artist = await artistsDao.findArtistBySpotifyId(spotifyArtistId);

        // If artist doesn't exist
        if (artist===null) {
            // Create artist
            artist = await artistsDao.createArtist(commentedArtist);
        } else {
            artist.imageUrl = imageUrl;
            await artistsDao.updateArtist(spotifyArtistId,artist)
        }

        const comment = {
            userId: userId,
            text: commentText,
            artistId: artist._id
        }

        const newComment = await commentsDao.createComment(comment);
        res.json(newComment);
    };

    /*
    (Body)
    {
        text: String
    }
     */
    const userCommentsOnLike = async (req, res) => {
        const commentText = req.body.text;
        const userId = req.params.userId;
        const likeId = req.params.likeId;

        const comment = {
            userId: userId,
            text: commentText,
            likeId: likeId
        }
        const newComment = await commentsDao.createComment(comment);
        res.json(newComment);
    };

    const findAllComments = async (req,res) => {
        const comments = await commentsDao.findAllComments();
        res.json(comments);
    }

    const findCommentsByUserId = async (req,res) => {
        const comments = await commentsDao.findCommentsByUserId(req.params.userId);
        res.json(comments);
    }

    const findCommentsByArtistSpotifyId = async (req,res) => {
        // Find artist by spotifyId
        const artist = await artistsDao.findArtistBySpotifyId(req.params.spotifyId);

        if (artist === null) {
            console.log("artist null")
            res.json([]);
        } else {
            console.log(artist);
            const comments = await commentsDao.findCommentsByArtistId(artist._id);
            res.json(comments);
        }
    }

    const findCommentsByAlbumSpotifyId = async (req,res) => {
        // Find album by spotifyId
        const album = await albumsDao.findAlbumBySpotifyId(req.params.spotifyId);

        if (album === null) {
            res.json([]);
        } else {
            const comments = await commentsDao.findCommentsByAlbumId(album._id);
            res.json(comments);
        }
    }

    const findCommentsByTrackSpotifyId = async (req,res) => {
        // Find track by spotifyId
        const track = await tracksDao.findTrackBySpotifyId(req.params.spotifyId);

        if (track === null) {
            res.json([]);
        } else {
            const comments = await commentsDao.findCommentsByTrackId(track._id);
            res.json(comments);
        }
    }

    const findCommentsByLikeId = async (req,res) => {
        const comments = await commentsDao.findCommentsByLikeId(req.params.likeId);
        res.json(comments);
    }

    const findCommentsOfUserFollowees = async (req,res) => {
        // Find given user's followees
        let followsWithUserFollowees = await followsDao.findFolloweesByUserId(req.params.userId);
        let followees = followsWithUserFollowees.map(follow => follow.followeeId);
        const commentsOfUserFollowees = await commentsDao.findCommentsByUserIds(followees);
        res.json(commentsOfUserFollowees);
    }

    const deleteComment = async (req,res) => {
        const status = await commentsDao.deleteComment(req.params.commentId);
        res.json(status);
    }

    app.get("/api/comments",findAllComments);
    app.get("/api/artists/:spotifyId/comments",findCommentsByArtistSpotifyId);
    app.get("/api/albums/:spotifyId/comments",findCommentsByAlbumSpotifyId);
    app.get("/api/tracks/:spotifyId/comments",findCommentsByTrackSpotifyId);
    app.get("/api/likes/:likeId/comments",findCommentsByLikeId);
    app.get("/api/users/:userId/comments", findCommentsByUserId);
    app.get("/api/users/:userId/followees/comments",findCommentsOfUserFollowees);
    app.post("/api/users/:userId/comments/artists/:spotifyId", userCommentsOnArtist);
    app.post("/api/users/:userId/comments/albums/:spotifyId", userCommentsOnAlbum);
    app.post("/api/users/:userId/comments/tracks/:spotifyId", userCommentsOnTrack);
    app.post("/api/users/:userId/comments/likes/:likeId", userCommentsOnLike);
    app.delete("/api/comments/:commentId", deleteComment);
};
export default CommentsController;