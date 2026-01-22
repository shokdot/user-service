import { FastifyReply } from "fastify";
import { AuthRequest, sendError, AppError } from '@core/index.js';
import { getUserByName } from '@services/basic/index.js';
import { userByUsernameDTO } from "src/dto/user-by-username.dto.js";

const getUserByNameHandler = async (request: AuthRequest<undefined, undefined, userByUsernameDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request;
		const { username } = request.params;

		const data = await getUserByName(userId, username);

		reply.status(200).send({
			status: 'success',
			data,
			message: 'Users found successfully'
		});
	}
	catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
}

export default getUserByNameHandler;
