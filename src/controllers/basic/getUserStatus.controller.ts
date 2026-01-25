import { FastifyReply } from "fastify";
import { AuthRequest, sendError, AppError } from '@core/index.js';
import { getUserStatus } from '@services/basic/index.js';
import { userByIdDTO } from "src/dto/user-by-id.dto.js";

const getUserStatusHandler = async (request: AuthRequest<undefined, undefined, userByIdDTO>, reply: FastifyReply) => {
	try {
		const selfUser = request.userId;
		const { userId } = request.params;

		const data = await getUserStatus(selfUser, userId);

		reply.status(200).send({
			status: 'success',
			data,
			message: 'User status retrieved successfully'
		});

	}
	catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
}

export default getUserStatusHandler;
