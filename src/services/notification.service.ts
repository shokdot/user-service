import axios from 'axios';
import { NOTIFICATION_SERVICE_URL, SERVICE_TOKEN } from 'src/utils/env.js';

export const sendFriendRequestNotification = async (
	receiverUserId: string,
	senderUsername: string
): Promise<void> => {
	try {
		await axios.post(
			`${NOTIFICATION_SERVICE_URL}/internal/`,
			{
				userId: receiverUserId,
				type: 'friend_request',
				message: `${senderUsername} sent you a friend request`
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'x-service-token': SERVICE_TOKEN
				}
			}
		);
	} catch (error) {
		console.error('[User Service] Failed to send friend request notification:', error);
	}
};

export const sendFriendAcceptedNotification = async (
	senderUserId: string,
	accepterUsername: string
): Promise<void> => {
	try {
		await axios.post(
			`${NOTIFICATION_SERVICE_URL}/internal/`,
			{
				userId: senderUserId,
				type: 'friend_request',
				message: `${accepterUsername} accepted your friend request`
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'x-service-token': SERVICE_TOKEN
				}
			}
		);
	} catch (error) {
		console.error('[User Service] Failed to send friend accepted notification:', error);
	}
};
