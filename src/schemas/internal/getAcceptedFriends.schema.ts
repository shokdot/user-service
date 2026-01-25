import { RouteShorthandOptions } from "fastify";
import { errorResponseSchema, serviceAuth } from "@core/index.js";

const getAcceptedFriendsSchema: RouteShorthandOptions = {
	preHandler: [serviceAuth],
	schema: {
		description: "Get accepted friends for a user (internal use only)",
		tags: ["Internal"],
		params: {
			type: "object",
			required: ["userId"],
			properties: {
				userId: { type: "string" }
			}
		},
		response: {
			200: {
				type: "object",
				required: ["status", "data", "message"],
				properties: {
					status: { type: "string", enum: ["success"] },
					data: {
						type: "object",
						required: ["friendIds"],
						properties: {
							friendIds: {
								type: "array",
								items: { type: "string" }
							}
						}
					},
					message: { type: "string" }
				}
			},
			400: errorResponseSchema,
			401: errorResponseSchema,
			403: errorResponseSchema,
			404: errorResponseSchema,
			500: errorResponseSchema
		}
	}
};

export default getAcceptedFriendsSchema;
