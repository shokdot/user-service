import { FastifyReply } from "fastify";
import { getUserById } from '@services/basic/index.js';
import { userByIdDTO } from "src/dto/user-by-id.dto.js";
import { AuthRequest } from "@core/types/authRequest.js";
import sendError from "@core/utils/sendError.js";

const getUserByIdHandler = async (request: AuthRequest<undefined, undefined, userByIdDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request.params;
		const selfUser = request.userId;

		const data = await getUserById(selfUser, userId);

		reply.status(200).send({
			status: 'success',
			data,
			message: 'User retrieved successfully'
		});

	}
	catch (error: any) {
		switch (error.code) {
			case 'USER_ID_REQUIRED':
				return sendError(reply, 400, error.code, 'Parameter "userId" is required.', { field: 'userId' });
			case 'USER_NOT_FOUND':
				return sendError(reply, 404, error.code, 'The requested user does not exist.');
			case 'USER_BLOCKED':
				return sendError(reply, 403, error.code, 'Access to this user is blocked.');

			default:
				return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
		}
	}
}

export default getUserByIdHandler;
