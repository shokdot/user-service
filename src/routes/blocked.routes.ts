import { FastifyInstance } from "fastify";
import {
	getBlockedHandler,
	blockUserHandler,
	unblockUserHandler,
	checkBlockHandler
} from '@controllers/blocked/index.js'
import { blocked } from "src/schemas/index.js";

const blockedRoutes = async (app: FastifyInstance) => {
	app.get("/blocks", blocked.getBlockedUsers, getBlockedHandler);
	app.post("/block", blocked.blockUser, blockUserHandler);
	app.post("/unblock", blocked.unblockUser, unblockUserHandler);
	app.get("/blocks/check", blocked.checkBlock, checkBlockHandler);
};

export default blockedRoutes;
