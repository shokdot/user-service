import { FastifyReply } from "fastify";
import { sendRequestDTO } from "src/dto/send-friend-request.dto.js";
import { sendRequest } from "@services/friends/index.js"
import { AuthRequest, sendError, AppError } from "@core/index.js";

const sendRequestHandler = async (request: AuthRequest<undefined, undefined, sendRequestDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request;
		const { username } = request.params;

		await sendRequest(userId, username);

		return reply.status(200).send({
			status: 'success',
			message: 'Friend request successfully sent.'
		});

	} catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
};

export default sendRequestHandler;
