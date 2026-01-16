import { errorResponseSchema } from "@core/schemas/error.schema.js";
import { RouteShorthandOptions } from "fastify";
import authenticate from "@core/middlewares/authenticate.middleware.js";

const getBlockedSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	schema:
	{
		description: "Get blocked users list",
		tags: ["Block"],
		security: [{ bearerAuth: [] }],
		response:
		{
			200: {
				type: 'object',
				required: ['status', 'data', 'message'],
				additionalProperties: false,
				properties: {
					status: { type: 'string', enum: ['success'] },
					data: {
						type: 'object',
						required: ['blocked', 'count'],
						additionalProperties: false,
						properties: {
							blocked: {
								type: 'array',
								items: {
									type: 'object',
									required: ['userId', 'username'],
									additionalProperties: false,
									properties: {
										userId: {
											type: 'string',
											format: 'uuid'
										},
										username: {
											type: 'string'
										}
									}
								}
							},
							count: { type: 'number' }
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
		}

	}
}

export default getBlockedSchema;
