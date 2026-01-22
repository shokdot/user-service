import { FastifyReply } from "fastify";
import { AuthRequest, sendError, AppError } from "@core/index.js";
import { unblockUser } from "@services/blocked/index.js";
import { blockUserDTO } from "src/dto/block-user.dto.js";

const unblockUserHandler = async (request: AuthRequest<blockUserDTO>, reply: FastifyReply) => {
	try {
		const { userId } = request;
		const { targetUsername } = request.body;

		await unblockUser(userId, targetUsername);

		return reply.status(200).send({
			status: "success",
			message: "User unblocked successfully.",
		});

	} catch (error: any) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}
		return sendError(reply, 500, "INTERNAL_SERVER_ERROR", "Internal server error");
	}
};

export default unblockUserHandler;
