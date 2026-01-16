import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema } from "@core/schemas/error.schema.js";
import authenticate from '@core/middlewares/authenticate.middleware.js'

const searchUserSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	schema:
	{
		description: "Search user by username.",
		tags: ["User"],
		security: [{ bearerAuth: [] }],
		querystring: {
			type: 'object',
			required: ['username'],
			additionalProperties: false,
			properties: {
				username: { type: 'string' }
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
						required: ['query', 'count', 'results'],
						additionalProperties: false,
						properties: {
							query: { type: 'string' },
							count: { type: 'number' },
							results: {
								type: 'array',
								items: {
									type: "object",
									additionalProperties: false,
									properties: {
										userId: { type: 'string', format: 'uuid' },
										username: { type: 'string' },
										avatarUrl: { type: 'string' },
										status: { type: 'string' }
									}
								}
							},

						}

					},
					message: { type: 'string' }
				},
			},
			400: errorResponseSchema,
			401: errorResponseSchema,
			403: errorResponseSchema,
			404: errorResponseSchema,
			500: errorResponseSchema
		},
	}
};

export default searchUserSchema;
