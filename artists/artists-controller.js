import * as artistsDao from "./artists-dao.js";

function ArtistsController(app) {
    const createArtist = async (req,res) => {
        const artist = await artistsDao.createArtist(req.body);
        res.json(artist);
    }

    const findAllArtists = async (req,res) => {
        const artists = await artistsDao.findAllArtists();
        res.json(artists);
    }

    const findArtistBySpotifyId = async (req,res) => {
        const sid = req.params.spotifyId;
        const artist = await artistsDao.findArtistBySpotifyId(sid);
        res.json(artist);
    }

    app.post("/api/artists",createArtist);
    app.get("/api/artists",findAllArtists);
    app.get("/api/artists/:spotifyId",findArtistBySpotifyId);
}
export default ArtistsController;