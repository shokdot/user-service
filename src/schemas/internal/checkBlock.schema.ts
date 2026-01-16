import { errorResponseSchema } from "@core/schemas/error.schema.js";
import { RouteShorthandOptions } from "fastify";
import serviceAuth from "@core/middlewares/serviceAuth.middleware.js";

const checkBlockSchema: RouteShorthandOptions = {
	preHandler: [serviceAuth as any],
	schema:
	{
		description: "Block user with username",
		tags: ["Internal"],
		security: [{ serviceToken: [] }],
		querystring: {
			type: 'object',
			required: ['userA', 'userB'],
			additionalProperties: false,
			properties: {
				userA: { type: 'string' },
				userB: { type: 'string' },
			},
		},
		response:
		{
			200: {
				type: 'object',
				required: ['status', 'data', 'message'],
				additionalProperties: false,
				properties: {
					status: { type: 'string', enum: ['success'] },
					data: { type: 'boolean' },
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

export default checkBlockSchema;
