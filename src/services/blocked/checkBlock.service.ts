import prisma from "src/utils/prismaClient.js";

const checkBlock = async (user: string, targetUser: string): Promise<boolean> => {
	const [userProfile, targetUserProfile] = await Promise.all([
		prisma.userProfile.findFirst({
			where: {
				OR: [
					{ userId: user },
					{ username: user }
				]
			},
			select: { userId: true }
		}),
		prisma.userProfile.findFirst({
			where: {
				OR: [
					{ userId: targetUser },
					{ username: targetUser }
				]
			},
			select: { userId: true }
		})
	]);

	if (!userProfile || !targetUserProfile) {
		return false;
	}

	const block = await prisma.block.findFirst({
		where: {
			OR: [
				{ blockerId: userProfile.userId, blockedId: targetUserProfile.userId },
				{ blockerId: targetUserProfile.userId, blockedId: userProfile.userId },
			],
		},
	});

	return !!block;
};

export default checkBlock;
