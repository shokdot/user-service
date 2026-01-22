import { FastifyReply, FastifyRequest } from "fastify";
import { deleteUser } from '@services/internal/index.js';
import { userByIdDTO } from "src/dto/user-by-id.dto.js";
import { sendError } from "@core/index.js";

const deleteUserHandler = async (request: FastifyRequest<{ Params: userByIdDTO }>, reply: FastifyReply) => {
	try {
		const { userId } = request.params;

		await deleteUser(userId);

		return reply.status(200).send({
			status: 'success',
			message: 'User deleted successfully',
		});
	}
	catch (error: any) {
		switch (error.code) {
			case 'USER_NOT_FOUND':
				return sendError(reply, 404, error.code, 'The requested user does not exist.');

			default:
				return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
		}
	}
};

export default deleteUserHandler;
