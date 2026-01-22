import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema, authenticate } from "@core/index.js";

const getUserStatusSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	schema:
	{
		description: "Get user status by userId",
		tags: ["Status"],
		security: [{ bearerAuth: [] }],
		params: {
			type: "object",
			required: ["userId"],
			properties: {
				userId: { type: "string", format: "uuid" }
			}
		},
		response: {
			200: {
				type: 'object',
				required: ['status', 'data', 'message'],
				additionalProperties: false,
				properties: {
					status: { type: 'string', enum: ['success'] },
					data: {
						type: 'object',
						required: ['status'],
						additionalProperties: false,
						properties: {
							status: { type: 'string' }
						}

					},
					message: { type: 'string' }
				},
			},
			400: errorResponseSchema,
			401: errorResponseSchema,
			403: errorResponseSchema,
			404: errorResponseSchema,
			409: errorResponseSchema,
			500: errorResponseSchema
		},
	}
};

export default getUserStatusSchema;
