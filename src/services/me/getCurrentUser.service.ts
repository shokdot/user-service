import prisma from "src/utils/prismaClient.js";
import { AppError } from "@core/index.js";

const getCurrentUser = async (userId: string) => {
	const user = await prisma.userProfile.findUnique({
		where: { userId },
		select: {
			userId: true,
			username: true,
			displayName: true,
			bio: true,
			avatarUrl: true,
			theme: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!user) throw new AppError('USER_NOT_FOUND');

	return user;
}

export default getCurrentUser;
