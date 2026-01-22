import { FastifyReply } from "fastify";
import { AuthRequest, sendError, AppError } from '@core/index.js';
import { updateAvatar } from '@services/avatar/index.js'
import { updateAvatarDTO } from "src/dto/update-avatar.dto.js";

const updateAvatarHandler = async (request: AuthRequest<updateAvatarDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request;
		const { avatarUrl } = request.body;

		await updateAvatar(userId, avatarUrl);

		reply.status(200).send({
			status: 'success',
			message: 'Avatar updated successfully.'
		});

	}
	catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
}

export default updateAvatarHandler;
