import { FastifyReply } from "fastify";
import { AuthRequest, sendError, AppError } from "@core/index.js";
import { acceptRequestDTO } from "src/dto/accept-friend-request.dto.js";
import { acceptRequest } from '@services/friends/index.js'

const acceptRequestHandler = async (request: AuthRequest<undefined, undefined, acceptRequestDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request;
		const { username } = request.params;

		await acceptRequest(userId, username);

		return reply.status(200).send({
			status: 'success',
			message: 'Friend request accepted.'
		});

	} catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
}
export default acceptRequestHandler;
