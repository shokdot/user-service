import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema, serviceAuth } from "@core/index.js";

const createUserSchema: RouteShorthandOptions = {
	preHandler: [serviceAuth],
	schema:
	{
		description: "Create user. Calls from auth-service dont call it manually use auth-service register instead",
		tags: ["Internal"],
		security: [{ serviceToken: [] }],
		body: {
			type: 'object',
			required: ['userId', 'username'],
			additionalProperties: false,
			properties: {
				userId: {
					type: 'string',
					format: 'uuid',
					description: 'User identifaction'
				},
				username: {
					type: 'string',
					minLength: 1,
					description: 'Display name'
				},
			},
		},
		response: {
			201: {
				type: 'object',
				required: ['status', 'message'],
				additionalProperties: false,
				properties: {
					status: { type: 'string', enum: ['success'] },
					message: { type: 'string' }
				},
			},
			409: errorResponseSchema,
			500: errorResponseSchema,
		},
	}
};

export default createUserSchema;
