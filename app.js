import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";

// Import controllers
import UserController from './users/users-controller.js';
import FollowsController from "./follows/follows-controller.js";

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
UserController(app);
FollowsController(app);

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/hello/:message", function (req, res) {
    const message = req.params.message;
    res.send(`Hello, ${message}!`);
});

app.listen(process.env.PORT || 4000);