import prisma from "src/utils/prismaClient.js";
import { AppError } from "@core/index.js";

const getUserById = async (userId: string, requestingUserId: string) => {

	if (!userId || !requestingUserId) throw new AppError('USER_ID_REQUIRED');

	const user = await prisma.userProfile.findUnique({
		where: { userId: requestingUserId },
		select: {
			userId: true,
			username: true,
			avatarUrl: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!user) throw new AppError('USER_NOT_FOUND');

	const block = await prisma.block.findFirst({
		where: {
			OR: [
				{ blockerId: requestingUserId, blockedId: userId },
				{ blockerId: userId, blockedId: requestingUserId }
			]
		}
	});

	if (block) throw new AppError('USER_BLOCKED');

	return user;
}

export default getUserById;
