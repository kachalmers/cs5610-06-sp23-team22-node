import * as tracksDao from "./tracks-dao.js";

function TracksController(app) {
    const findAllTracks = async (req,res) => {
        const tracks = await tracksDao.findAllTracks();
        res.send(tracks);
    }

    const findTrackBySpotifyId = async (req,res) => {
        const stid = req.params.stid;
        const track = await tracksDao.findTrackBySpotifyId(stid);
        res.send(track);
    }

    const createTrack = async (req,res) => {
        const track = await tracksDao.createTrack(req.body);
        res.json(track);
    }

    app.post("/api/tracks",createTrack);
    app.get("/api/tracks",findAllTracks);
    app.get("/api/tracks/:stid",findTrackBySpotifyId);
}
export default TracksController;