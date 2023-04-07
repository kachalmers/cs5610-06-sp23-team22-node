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

    app.put("/api/users/:followerId/follows/:followeeId",toggleFollow);
    app.get("/api/follows",findAllFollows);
    app.get("/api/users/:followerId/follows/:followeeId", findFollowByUserIds);
    app.post("/api/users/:followerId/follows/:followeeId", userFollowsUser);
    app.delete("/api/users/:followerId/follows/:followeeId", userUnfollowsUser);
};
export default FollowsController;