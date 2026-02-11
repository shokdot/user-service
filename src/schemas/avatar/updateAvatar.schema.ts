import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema, authenticate } from "@core/index.js";

const updateAvatarSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	bodyLimit: 5 * 1024 * 1024, // 5 MB — base64 images are ~33% larger than the original
	schema:
	{
		description: "Update avatar",
		tags: ["Avatar"],
		security: [{ bearerAuth: [] }],
		body: {
			type: 'object',
			required: ['avatarUrl'],
			properties: {
				avatarUrl: { type: 'string' },
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
			400: errorResponseSchema,
			401: errorResponseSchema,
			403: errorResponseSchema,
			404: errorResponseSchema,
			500: errorResponseSchema
		},
	}
};

export default updateAvatarSchema;
