import { FastifyReply, FastifyRequest } from "fastify";
import { getAcceptedFriends } from '@services/internal/index.js';
import { userByIdDTO } from "src/dto/user-by-id.dto.js";
import { sendError, AppError } from "@core/index.js";

const getAcceptedFriendsHandler = async (
	request: FastifyRequest<{ Params: userByIdDTO }>, 
	reply: FastifyReply
) => {
	try {
		const { userId } = request.params;
		const friendIds = await getAcceptedFriends(userId);

		reply.status(200).send({
			status: 'success',
			data: { friendIds },
			message: 'Accepted friends retrieved successfully'
		});

	} catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
};

export default getAcceptedFriendsHandler;
