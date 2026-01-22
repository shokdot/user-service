import { FastifyRequest, FastifyReply } from 'fastify';
import { createUserDTO } from 'src/dto/create-user.dto.js';
import { createUser } from '@services/internal/index.js';
import { sendError, AppError } from '@core/index.js';

const createUserHandler = async (request: FastifyRequest<{ Body: createUserDTO }>, reply: FastifyReply) => {
	try {
		const { userId, username } = request.body;
		await createUser(userId, username);

		reply.status(201).send({
			status: 'success',
			message: 'User created successfully.'
		});

	} catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}

}

export default createUserHandler;
