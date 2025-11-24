import { FastifyReply } from "fastify";
import { AuthRequest } from '@core/types/authRequest.js';
import { searchUser } from '@services/basic/index.js';
import { userByUsernameDTO } from "src/dto/user-by-username.dto.js";
import sendError from "@core/utils/sendError.js";

const searchUserHandler = async (request: AuthRequest<undefined, userByUsernameDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request;
		const { username } = request.query;

		const data = await searchUser(userId, username);

		reply.status(200).send({
			status: 'success',
			data,
			message: data.count > 0 ? 'Users found successfully' : 'No users found'
		});

	}
	catch (error: any) {
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
}

export default searchUserHandler;
