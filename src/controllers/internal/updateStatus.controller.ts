import { FastifyReply, FastifyRequest } from "fastify";
import { updateStatus } from '@services/internal/index.js';
import { updateStatusDTO } from "src/dto/update-status.dto.js";
import { userByIdDTO } from "src/dto/user-by-id.dto.js";
import { sendError } from "@core/index.js";

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
        switch (error.code) {
            case 'NO_STATUS_PROVIDED':
                return sendError(reply, 400, error.code, 'No status provided for update.', { field: 'status' });

            case 'INVALID_STATUS':
                return sendError(reply, 400, error.code, 'Invalid status provided for update.', { field: 'status' });

            case 'USER_NOT_FOUND':
                return sendError(reply, 404, error.code, 'The requested user does not exist.');

            default:
                return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
        }
    }
}

export default updateStatusHandler;
