import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";

// Import controllers
import UsersController from './users/users-controller.js';
import ArtistsController from './artists/artists-controller.js';
import AlbumsController from './albums/albums-controller.js';
import TracksController from './tracks/tracks-controller.js';
import FollowsController from "./follows/follows-controller.js";
import LikesController from "./likes/likes-controller.js";
import CommentsController from "./comments/comments-controller.js";

dotenv.config();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
                          || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
             credentials: true,
             origin: "http://localhost:3000",
         })
);
app.use(express.json());
app.use(
    session({
                secret: "process.env.SECRET",
                resave: false,
                cookie: { secure: false },
            })
);

// Call controllers
UsersController(app);
ArtistsController(app);
AlbumsController(app);
TracksController(app);
FollowsController(app);
LikesController(app);
CommentsController(app);

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/hello/:message", function (req, res) {
    const message = req.params.message;
    res.send(`Hello, ${message}!`);
});

app.listen(process.env.PORT || 4000);