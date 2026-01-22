import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema, serviceAuth } from "@core/index.js";

const deleteUserSchema: RouteShorthandOptions = {
	preHandler: [serviceAuth],
	schema:
	{
		description: "Delete user by id",
		tags: ["Internal"],
		security: [{ serviceToken: [] }],
		params: {
			type: 'object',
			required: ['userId'],
			additionalProperties: false,
			properties: {
				userId: { type: 'string', format: 'uuid' }
			},
		},
		response: {
			200: {
				type: 'object',
				required: ['status', 'message'],
				additionalProperties: false,
				properties: {
					status: { type: 'string', enum: ['success'] },
					message: { type: 'string' }
				},
			},
			401: errorResponseSchema,
			403: errorResponseSchema,
			404: errorResponseSchema,
			500: errorResponseSchema
		},
	}
};

export default deleteUserSchema;
