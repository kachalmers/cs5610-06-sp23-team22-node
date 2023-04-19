import * as albumsDao from "./albums-dao.js";
import {createAlbumWithArtists} from "../helpers/helpers.js";

function AlbumsController(app) {
    const createAlbum = async (req,res) => {
        const album = await createAlbumWithArtists(req.body);
        res.json(album);
    }

    const findAllAlbums = async (req,res) => {
        const albums = await albumsDao.findAllAlbums();
        res.json(albums);
    }

    const findAlbumBySpotifyId = async (req,res) => {
        const sid = req.params.spotifyId;
        const album = await albumsDao.findAlbumBySpotifyId(sid);
        res.json(album);
    }

    app.post("/api/albums",createAlbum);
    app.get("/api/albums",findAllAlbums);
    app.get("/api/albums/:spotifyId",findAlbumBySpotifyId);
}
export default AlbumsController;