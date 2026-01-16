import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema } from "@core/schemas/error.schema.js";
import serviceAuth from "@core/middlewares/serviceAuth.middleware.js";

const deleteUserSchema: RouteShorthandOptions = {
	preHandler: [serviceAuth as any],
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
