import authenticate from "@core/middlewares/authenticate.middleware.js";
import { errorResponseSchema } from "@core/schemas/error.schema.js";
import { RouteShorthandOptions } from "fastify";

const blockUserSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	schema:
	{
		description: "Block user with username",
		tags: ["Block"],
		body:
		{
			type: 'object',
			required: ['targetUsername'],
			additionalProperties: false,
			properties: {
				targetUsername: {
					type: 'string',
					description: 'Target username'
				}
			}
		},
		response:
		{
			200: {
				type: 'object',
				required: ['status', 'message'],
				additionalProperties: false,
				properties: {
					status: { type: 'string', enum: ['success'] },
					message: { type: 'string' }
				},
			},
			400: errorResponseSchema,
			401: errorResponseSchema,
			403: errorResponseSchema,
			404: errorResponseSchema,
			500: errorResponseSchema
		}

	}
}

export default blockUserSchema;
