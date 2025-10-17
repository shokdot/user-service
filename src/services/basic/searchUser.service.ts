import prisma from "src/utils/prismaClient.js";

const searchUser = async (userId: string, query: string) => {
	const users = await prisma.userProfile.findMany({
		where: {
			username: {
				contains: query.toLowerCase(),
			},
			NOT: {
				userId,
			},
			blocks: {
				none: {
					blockedId: userId
				}
			},
			blockedBy: {
				none: {
					blockerId: userId
				}
			}
		},
		select: {
			userId: true,
			username: true,
			avatarUrl: true,
			status: true,
		},
	});

	return {
		query,
		count: users.length,
		results: users,
	}
}

export default searchUser;
