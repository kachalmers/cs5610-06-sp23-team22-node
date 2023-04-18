import * as followsDao from "./follows-dao.js";

const FollowsController = (app) => {
    const userFollowsUser = async (req, res) => {
        const followerId = req.params.followerId;
        const followeeId = req.params.followeeId;
        const follow = await followsDao.userFollowsUser(followerId, followeeId);
        console.log(follow);
        res.json(follow);
    };
    const userUnfollowsUser = async (req,res) => {
        const status = await followsDao.userUnfollowsUser(req.params.followerId, req.params.followeeId);
        res.send(status);
    };
    const findAllFollows = async (req,res) => {
        const follows = await followsDao.findAllFollows();
        res.json(follows);
    }

    const findFollowByUserIds = async (req,res) => {
        const follow = await followsDao.findFollowByUserIds(req.params.followerId, req.params.followeeId);
        res.json(follow);
    }

    const toggleFollow = async (req,res) => {
        const follower = req.params.followerId;
        const followee = req.params.followeeId;

        // Find follow between given users if it exists
        let follow = await followsDao.findFollowByUserIds(follower, followee);

        // If follow between users exists...
        if (follow) {
            // Delete follow
            await followsDao.userUnfollowsUser(req.params.followerId, req.params.followeeId);
        } else {
            // Create follow
            const followerId = req.params.followerId;
            const followeeId = req.params.followeeId;
            await followsDao.userFollowsUser(followerId, followeeId);
        }
        res.sendStatus(200);
    }

    const findFollowsByFollowerId = async (req,res) => {
        const currentUser = req.session["currentUser"];
        const follows = await followsDao.findFolloweesByUserId(req.params.followerId);

        // If a user is logged in...
        if (currentUser) {
            const markedUsers = await Promise.all(follows.map(async (follow) => {   // For each follow
                // Search for a follow by currentUser of followee
                let followIfExists = await followsDao.findFollowByUserIds(currentUser._id,follow.followeeId);

                if (followIfExists !== null) {   // if currentUser follows user
                    follow.followeeId.followedByMe = true;
                    return follow;
                } else {
                    return follow;
                }
            }))
            res.send(markedUsers);
        } else {
            res.json(follows);
        }
    }

    const findFollowsByFolloweeId = async (req,res) => {
        const currentUser = req.session["currentUser"];
        const follows = await followsDao.findFollowersByUserId(req.params.followeeId);

        // If a user is logged in...
        if (currentUser) {
            const markedUsers = await Promise.all(follows.map(async (follow) => {   // For each follow
                // Search for a follow by follower of currentUser
                let followIfExists = await followsDao.findFollowByUserIds(currentUser._id,follow.followerId);

                if (followIfExists !== null) {   // if currentUser follows user
                    follow.followerId.followedByMe = true;
                    return follow;
                } else {
                    return follow;
                }
            }))
            res.send(markedUsers);
        } else {
            res.json(follows);
        }
    }

    app.put("/api/users/:followerId/follows/:followeeId",toggleFollow);
    app.get("/api/follows",findAllFollows);
    app.get("/api/users/:followerId/follows/:followeeId", findFollowByUserIds);
    app.get("/api/users/:followerId/followees", findFollowsByFollowerId);
    app.get("/api/users/:followeeId/followers", findFollowsByFolloweeId);
    app.post("/api/users/:followerId/follows/:followeeId", userFollowsUser);
    app.delete("/api/users/:followerId/follows/:followeeId", userUnfollowsUser);
};
export default FollowsController;