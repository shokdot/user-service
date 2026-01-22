import prisma from 'src/utils/prismaClient.js'
import { AppError } from '@core/index.js';

const unblockUser = async (userId: string, targetUsername: string) => {

	const target = await prisma.userProfile.findFirst({ where: { username: targetUsername } });
	if (!target) throw new AppError('BLOCK_NOT_FOUND');

	const existing = await prisma.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: userId,
				blockedId: target.userId,
			},
		},
	});

	if (!existing) throw new AppError('BLOCK_NOT_FOUND');


	await prisma.block.delete({
		where: {
			id: existing.id,
		},
	});
}

export default unblockUser;
