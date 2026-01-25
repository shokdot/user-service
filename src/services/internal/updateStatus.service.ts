import { userStatus } from 'src/types/userStatus.js';
import { AppError } from "@core/index.js";
import prisma from 'src/utils/prismaClient.js';
import notifyFriends from './notifyFriends.service.js';

const updateStatus = async (userId: string, status: userStatus) => {

	if (!status)
		throw new AppError('NO_STATUS_PROVIDED');

	if (!Object.values(userStatus).includes(status))
		throw new AppError('INVALID_STATUS');

	try {
		await prisma.userProfile.update({
			where: { userId },
			data: { status },
		});

		await notifyFriends(userId, status);

	} catch (error: any) {
		if (error.code === 'P2025') {
			throw new AppError('USER_NOT_FOUND');
		}
		throw error;
	}
}

export default updateStatus;
