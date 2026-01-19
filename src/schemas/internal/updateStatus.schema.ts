import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema } from "@core/schemas/error.schema.js";
import serviceAuth from '@core/middlewares/serviceAuth.middleware.js';

const updateStatusSchema: RouteShorthandOptions = {
    preHandler: [serviceAuth],
    schema: {
        description: "Update user status",
        tags: ["Internal"],
        params: {
            type: "object",
            required: ["userId"],
            properties: {
                userId: { type: "string" }
            }
        },
        body: {
            type: "object",
            required: ["status"],
            properties: {
                status: { type: "string", enum: ["ONLINE", "OFFLINE", "IN_GAME"] }
            },
            additionalProperties: false
        },
        response: {
            200: {
                type: "object",
                required: ["status", "message"],
                properties: {
                    status: { type: "string", enum: ["success"] },
                    message: { type: "string" }
                }
            },
            400: errorResponseSchema,
            401: errorResponseSchema,
            403: errorResponseSchema,
            404: errorResponseSchema,
            500: errorResponseSchema
        }
    }
};

export default updateStatusSchema;
