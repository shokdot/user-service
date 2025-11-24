import prisma from 'src/utils/prismaClient.js'
import { AppError } from '@core/utils/AppError.js';

const blockUser = async (userId: string, targetUsername: string) => {

	const blocker = await prisma.userProfile.findUnique({ where: { userId } });
	if (!blocker) throw new AppError('USER_NOT_FOUND');

	const target = await prisma.userProfile.findUnique({ where: { username: targetUsername }, });
	if (!target) throw new AppError('USER_NOT_FOUND');

	if (userId === target.userId) throw new AppError('BLOCK_SELF');

	const existing = await prisma.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: userId,
				blockedId: target.userId,
			},
		},
	});

	if (existing) return false;

	await prisma.block.create({
		data: {
			blockerId: userId,
			blockedId: target.userId,
		},
	});

	await prisma.friendship.deleteMany({
		where: {
			OR: [
				{ senderUserId: userId, receiverUserId: target.userId },
				{ senderUserId: target.userId, receiverUserId: userId },
			],
		},
	});

	return true;
}

export default blockUser;
