import { FastifyReply, FastifyRequest } from "fastify";
import { updateStatus } from '@services/internal/index.js';
import { updateStatusDTO } from "src/dto/update-status.dto.js";
import { userByIdDTO } from "src/dto/user-by-id.dto.js";
import { sendError, AppError } from "@core/index.js";

const updateStatusHandler = async (request: FastifyRequest<{ Params: userByIdDTO, Body: updateStatusDTO }>, reply: FastifyReply) => {
    try {
        const { userId } = request.params;
        const { status } = request.body;

        await updateStatus(userId, status);

        reply.status(200).send({
            status: 'success',
            message: 'User status updated successfully'
        });

    }
    catch (error: any) {
        if (error instanceof AppError) {
            return sendError(reply, error);
        }
        return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
    }
}

export default updateStatusHandler;
