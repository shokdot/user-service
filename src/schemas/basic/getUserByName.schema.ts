import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema, authenticate } from "@core/index.js";

const getUserByNameSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	schema:
	{
		description: "Get user information by username.",
		tags: ["User"],
		security: [{ bearerAuth: [] }],
		params: {
			type: 'object',
			required: ['username'],
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
						required: ['userId', 'username', 'status', 'createdAt', 'updatedAt'],
						additionalProperties: false,
						properties: {
							userId: { type: 'string', format: 'uuid' },
							username: { type: 'string' },
							displayName: { type: 'string', nullable: true },
							bio: { type: 'string', nullable: true },
							avatarUrl: { type: 'string', nullable: true },
							status: { type: 'string' },
							createdAt: { type: 'string' },
							updatedAt: { type: 'string' },
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

export default getUserByNameSchema;
