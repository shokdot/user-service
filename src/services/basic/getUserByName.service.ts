import prisma from "src/utils/prismaClient.js";
import { AppError } from "@core/index.js";

const getUserByName = async (userId: string, username: string) => {



	const user = await prisma.userProfile.findUnique({
		where: { username },
		select: {
			userId: true,
			username: true,
			displayName: true,
			bio: true,
			avatarUrl: true,
			status: true,
			createdAt: true,
			updatedAt: true,
		}
	});

	if (!user) throw new AppError('USER_NOT_FOUND');

	const block = await prisma.block.findFirst({
		where: {
			OR: [
				{ blockerId: userId, blockedId: user.userId },
				{ blockerId: user.userId, blockedId: userId }
			]
		}
	});

	if (block) throw new AppError('USER_BLOCKED');

	return user;
}

export default getUserByName;
