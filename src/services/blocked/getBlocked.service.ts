import prisma from 'src/utils/prismaClient.js'

const getBlocked = async (userId: string) => {

	const blocks = await prisma.block.findMany({
		where: { blockerId: userId },
		include: {
			blocked: {
				select: {
					userId: true,
					username: true,
					avatarUrl: true,
				},
			},
		},
	});

	const data = blocks.map((b) => b.blocked);

	return { blocked: data, count: data.length };
}

export default getBlocked;
