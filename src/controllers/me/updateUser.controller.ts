import { FastifyReply } from "fastify";
import { AuthRequest, sendError, AppError } from '@core/index.js';
import { updateUser } from '@services/me/index.js';
import { updateUserDTO } from "src/dto/update-user.dto.js";

const updateUserHandler = async (request: AuthRequest<updateUserDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request;
		const body = request.body;
		const data = await updateUser(userId, body);

		reply.status(200).send({
			status: 'success',
			data,
			message: 'User updated successfully'
		});

	}
	catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
}

export default updateUserHandler;
