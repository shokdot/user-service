import { errorResponseSchema, authenticate } from "@core/index.js";
import { RouteShorthandOptions } from "fastify";

const listFriendsSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	schema:
	{
		description: "Delete accepted or pending friend request.",
		tags: ["Friends"],
		security: [{ bearerAuth: [] }],
		querystring: {
			type: 'object',
			additionalProperties: false,
			properties: {
				status: {
					type: 'string',
					enum: ['pending', 'accepted'],
				}
			}
		},
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
						required: ['friends', 'count'],
						additionalProperties: false,
						properties: {
							friends: {
								type: 'object',
								required: ['userId', 'username', 'status'],
								additionalProperties: false,
								properties: {
									userId: { type: 'string', format: 'uuid' },
									username: { type: 'string' },
									status: { type: 'string', enum: ['pending', 'accepted'] }
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

export default listFriendsSchema;
