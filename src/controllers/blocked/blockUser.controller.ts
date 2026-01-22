import { FastifyReply } from "fastify";
import { AuthRequest, sendError } from "@core/index.js";
import { blockUser } from "@services/blocked/index.js";
import { blockUserDTO } from "src/dto/block-user.dto.js";

const blockUserHandler = async (request: AuthRequest<blockUserDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request;
		const { targetUsername } = request.body;

		const isSucceed = await blockUser(userId, targetUsername);

		return reply.status(200).send({
			status: "success",
			message: isSucceed ? "User blocked successfully." : "User already blocked.",
		});

	} catch (error: any) {
		switch (error.code) {
			case 'BLOCK_SELF':
				return sendError(reply, 400, error.code, 'You cannot block yourself.');
			case 'USER_NOT_FOUND':
				return sendError(reply, 404, error.code, 'The requested user does not exist.');

			default:
				return sendError(reply, 500, "INTERNAL_SERVER_ERROR", "Internal server error");
		}
	}
};

export default blockUserHandler;
