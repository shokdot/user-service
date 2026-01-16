import { FastifyInstance } from "fastify";
import {
	listFriendsHandler,
	sendRequestHandler,
	acceptRequestHandler,
	deleteRequestHandler
} from '@controllers/friends/index.js'
import { friends } from "@schemas/index.js";

const friendsRoutes = async (app: FastifyInstance) => {
	app.get('/', friends.listFriends, listFriendsHandler);
	app.post('/:username', friends.sendRequest, sendRequestHandler);
	app.patch('/:username', friends.acceptRequest, acceptRequestHandler);
	app.delete('/:username', friends.deleteRequest, deleteRequestHandler);
}

export default friendsRoutes;