import authenticate from "@core/middlewares/authenticate.middleware.js";
import { FastifyInstance } from "fastify";
import {
	getBlockedHandler,
	blockUserHandler,
	unblockUserHandler,
	checkBlockHandler
} from '@controllers/blocked/index.js'
import serviceAuth from "@core/middlewares/serviceAuth.middleware.js";
// import { blocked } from "src/schemas/index.js"; // we’ll define schemas after

const blockedRoutes = async (app: FastifyInstance) => {
	app.get("/blocks", { preHandler: authenticate }, getBlockedHandler);
	app.post("/block", { preHandler: authenticate }, blockUserHandler);
	app.post("/unblock", { preHandler: authenticate }, unblockUserHandler);
	app.get("/blocks/check", { preHandler: serviceAuth }, checkBlockHandler);
};

export default blockedRoutes;
