import { FastifyReply } from "fastify";
import { AuthRequest, sendError, AppError } from '@core/index.js';
import { updateAvatar } from '@services/avatar/index.js'
import getAvatarUrl from "src/utils/avatar.js";

const deleteAvatarHandler = async (request: AuthRequest, reply: FastifyReply) => {
	try {
		const { userId } = request;

		await updateAvatar(userId, getAvatarUrl());

		reply.status(200).send({
			status: 'success',
			message: 'Avatar deleted successfully.'
		});

	}
	catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
}

export default deleteAvatarHandler;
