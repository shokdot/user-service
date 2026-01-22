import { FastifyReply } from "fastify";
import { AuthRequest, sendError } from '@core/index.js';
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
			message: 'User status updated successfully'
		});

	}
	catch (error: any) {
		switch (error.code) {
			case 'USER_NOT_FOUND':
				return sendError(reply, 404, error.code, 'The requested user does not exist.');
			case 'USER_BLOCKED':
				return sendError(reply, 403, error.code, 'Access to this user is blocked.');

			default:
				return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
		}
	}
}

export default getUserStatusHandler;
