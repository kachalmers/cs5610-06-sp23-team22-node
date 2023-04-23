import * as usersDao from "./users-dao.js";
import * as followsDao from "../follows/follows-dao.js";
import * as commentsDao from "../comments/comments-dao.js";
import * as likesDao from "../likes/likes-dao.js";

function UsersController(app) {
    const findAllUsers = async (req, res) => {
        const currentUser = req.session["currentUser"];

        // If a user is logged in...
        if (currentUser) {
            const users = await usersDao.findAllUsers();    // Get all users

            const markedUsers = await Promise.all(users.map(async (user) => {   // For each user
                // Search for a follow by currentUser of user
                let follow = await followsDao.findFollowByUserIds(currentUser._id,user._id);
                console.log("FOLLOW: "+follow);

                if (follow !== null) {   // if currentUser follows user
                    user.followedByMe = true;
                    console.log("FOLLOWED BY ME");
                    return user;
                } else {
                    return user;
                }
            }))
            console.log("markedUsers?")
            res.send(markedUsers);
        } else {
            const users = await usersDao.findAllUsers();
            res.send(users);
        }
    };
    const findUserById = async (req, res) => {
        const id = req.params.id;
        const user = await usersDao.findUserById(id);
        res.send(user);
    };
    const deleteUserById = async (req, res) => {
        const id = req.params.id;

        // Delete user's likes
        await likesDao.deleteLikesByUser(id);

        // Delete user's comments
        await commentsDao.deleteCommentsByUser(id);

        // Delete user's follows
        await followsDao.deleteFollowsByFollower(id);
        await followsDao.deleteFollowsByFollowee(id);

        const status = await usersDao.deleteUser(id);
        res.json(status);
    };
    const createUser = async (req, res) => {
        const user = await usersDao.createUser(req.body);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const id = req.params.id;
        const currentUser = req.session["currentUser"];
        if (id===currentUser._id) {
            req.session["currentUser"] = { ...currentUser, ...req.body }
        }
        const status = await usersDao.updateUser(id, req.body);
        res.json(status);
    };
    const login = async (req, res) => {
        const foundUser = await usersDao.findUserByCredentials(
            req.body.username,
            req.body.password
        );
        if (foundUser) {
            req.session["currentUser"] = foundUser;
            res.send(foundUser);
        } else {
            res.sendStatus(404);
        }
    };
    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(204);
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            res.send(currentUser);
        } else {
            res.sendStatus(404);
        }
    };
    const register = async (req, res) => {
        const user = req.body;
        const foundUser = await usersDao.findUserByUsername(req.body.username);
        if (foundUser) {
            res.sendStatus(409);
        } else {
            const newUser = await usersDao.createUser(user);
            req.session["currentUser"] = newUser;
            res.json(newUser);
        }
    };

    const findAllUsersByText = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const text = req.params.text;

        const users = await usersDao.findAllUsersByText(text);    // Get all users

        // If a user is logged in...
        if (currentUser) {

            const markedUsers = await Promise.all(users.map(async (user) => {   // For each user
                // Search for a follow by currentUser of user
                let follow = await followsDao.findFollowByUserIds(currentUser._id,user._id);
                console.log("FOLLOW: "+follow);

                if (follow !== null) {   // if currentUser follows user
                    user.followedByMe = true;
                    console.log("FOLLOWED BY ME");
                    return user;
                } else {
                    return user;
                }
            }))
            console.log("markedUsers?")
            res.send(markedUsers);
        } else {
            res.send(users);
        }
    };

    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.get("/api/users/profile", profile);
    app.post("/api/users/register", register);

    app.get("/api/users", findAllUsers);
    app.get("/api/users/fields/:text", findAllUsersByText);
    app.get("/api/users/:id", findUserById);
    app.delete("/api/users/:id", deleteUserById);
    app.post("/api/users", createUser);
    app.put("/api/users/:id", updateUser);
}

export default UsersController;