import { listFriends } from '../friends/index.js';

const getAcceptedFriends = async (userId: string): Promise<string[]> => {
	const result = await listFriends(userId, 'accepted');

	return result.friends.map(friend => friend.userId);
};

export default getAcceptedFriends;
