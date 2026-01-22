import { FastifyReply } from "fastify";
import { AuthRequest, sendError, AppError } from "@core/index.js";
import { listFriends } from '@services/friends/index.js'
import { listFriendDTO } from "src/dto/list-friend.dto.js";

const listFriendsHandler = async (requst: AuthRequest<undefined, listFriendDTO>, reply: FastifyReply) => {
	try {
		const { userId } = requst;
		const { status } = requst.query;

		const data = await listFriends(userId, status);

		return reply.status(200).send({
			status: 'success',
			data,
			message: data.count > 0 ? 'Friends list retrieved successfully.' : 'No friends yet.'
		});

	} catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
};

export default listFriendsHandler;
