import { FastifyInstance } from "fastify";
import { internal } from "@schemas/index.js";
import {
    createUserHandler,
    updateStatusHandler,
    checkBlockHandler,
    deleteUserHandler,
    getAcceptedFriendsHandler
} from "@controllers/internal/index.js"

const internalRoutes = async (app: FastifyInstance) => {
    app.post('/', internal.createUser, createUserHandler);
    app.patch('/:userId/status', internal.updateStatus, updateStatusHandler);
    app.get("/check-block", internal.checkBlock, checkBlockHandler);
    app.get('/:userId/friends', internal.getAcceptedFriends, getAcceptedFriendsHandler);
    app.delete('/:userId', internal.deleteUser, deleteUserHandler);
}

export default internalRoutes;