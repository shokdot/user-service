import { FastifyReply, FastifyRequest } from "fastify";
import { checkBlock } from "@services/internal/index.js";
import { checkBlockDTO } from "src/dto/check-block.dto.js";
import { sendError } from "@core/index.js";

const checkBlockHandler = async (request: FastifyRequest<{ Querystring: checkBlockDTO }>, reply: FastifyReply) => {
	try {
		const { userA, userB } = request.query;

		const data = await checkBlock(userA, userB);

		return reply.status(200).send({
			status: "success",
			data,
			message: data
				? "One of the users has blocked the other"
				: "No block relationship found between users"
		});

	} catch (error: any) {
		return sendError(reply, 500, "INTERNAL_SERVER_ERROR", "Internal server error");
	}
};

export default checkBlockHandler;
