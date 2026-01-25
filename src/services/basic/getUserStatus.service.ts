import prisma from 'src/utils/prismaClient.js';
import { AppError } from "@core/index.js";
import { userStatus } from 'src/types/userStatus.js';

const getUserStatus = async (targetUserId: string, requestingUserId: string) => {

	const targetUser = await prisma.userProfile.findUnique({
		where: { userId: targetUserId },
		select: { status: true }
	});

	if (!targetUser) {
		throw new AppError('USER_NOT_FOUND');
	}

	const block = await prisma.block.findFirst({
		where: {
			OR: [
				{ blockerId: targetUserId, blockedId: requestingUserId },
				{ blockerId: requestingUserId, blockedId: targetUserId }
			]
		}
	});

	if (block) {
		return {
			status: 'OFFLINE' as userStatus,
			isBlocked: true
		};
	}

	return {
		status: targetUser.status as userStatus,
		isBlocked: false
	};
}

export default getUserStatus;
