import prisma from 'src/utils/prismaClient.js';
import { AppError } from "@core/index.js";

const getUserStatus = async (userId: string, requestingUserId: string) => {

	const block = await prisma.block.findFirst({
		where: {
			OR: [
				{ blockerId: userId, blockedId: requestingUserId },
				{ blockerId: requestingUserId, blockedId: userId }
			]
		}
	});

	if (block) throw new AppError('USER_BLOCKED');

	const status = await prisma.userProfile.findUnique({
		where: { userId: requestingUserId },
		select: { status: true }
	});

	if (!status)
		throw new AppError('USER_NOT_FOUND');

	return status;

}

export default getUserStatus;
