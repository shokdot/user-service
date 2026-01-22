import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema, authenticate } from '@core/index.js'

const deleteAvatarSchema: RouteShorthandOptions = {
	preHandler: [authenticate],
	schema:
	{
		description: "Delete avatar",
		tags: ["Avatar"],
		security: [{ bearerAuth: [] }],
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

export default deleteAvatarSchema;
