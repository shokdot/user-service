import prisma from "src/utils/prismaClient.js";

const listFriends = async (userId: string, status?: string) => {
	const statusFilter = status ? { in: [status] } : undefined;

	const friendships = await prisma.friendship.findMany({
		where: {
			OR: [
				{ senderUserId: userId, ...(statusFilter && { status: statusFilter }) },
				{ receiverUserId: userId, ...(statusFilter && { status: statusFilter }) }
			]
		},
		select: {
			status: true,
			createdAt: true,
			sender: { select: { userId: true, username: true, avatarUrl: true, status: true } },
			receiver: { select: { userId: true, username: true, avatarUrl: true, status: true } },
			senderUserId: true,
			receiverUserId: true
		}
	});

	const friends = friendships.map(f => {
		const isSender = f.senderUserId === userId;
		const friend = isSender ? f.receiver : f.sender;
		return {
			userId: friend.userId,
			username: friend.username,
			avatarUrl: friend.avatarUrl,
			onlineStatus: friend.status,
			status: f.status,
			...(f.status === 'pending' && {
				direction: isSender ? 'outgoing' as const : 'incoming' as const
			}),
			createdAt: f.createdAt.toISOString()
		};
	});

	return {
		friends,
		count: friends.length
	};
};

export default listFriends;
