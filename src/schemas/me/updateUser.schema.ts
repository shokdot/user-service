import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema, authenticate } from "@core/index.js";

const updateUserSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	schema:
	{
		description: "Update current user information (username, avatarUrl, preferences, metadata)",
		tags: ["User"],
		security: [{ bearerAuth: [] }],
		body: {
			type: "object",
			properties: {
				username: { type: "string" },
				displayName: { type: "string", maxLength: 50 },
				bio: { type: "string", maxLength: 160 },
				avatarUrl: { type: "string" },
			},
			additionalProperties: false,
			minProperties: 1,
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
						required: ['userId', 'username', 'createdAt', 'updatedAt'],
						additionalProperties: false,
						properties: {
							userId: { type: 'string', format: 'uuid' },
							username: { type: 'string' },
							displayName: { type: 'string', nullable: true },
							bio: { type: 'string', nullable: true },
							avatarUrl: { type: 'string', nullable: true },
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
			409: errorResponseSchema,
			500: errorResponseSchema
		},
	}
};

export default updateUserSchema;
