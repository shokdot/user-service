import axios from 'axios';
import { NOTIFICATION_SERVICE_URL, SERVICE_TOKEN } from 'src/utils/env.js';
import { userStatus } from 'src/types/userStatus.js';

const notifyFriends = async (userId: string, status: userStatus) => {

	try {
		await axios.post(
			`${NOTIFICATION_SERVICE_URL}/internal/status/notify-friends`,
			{ userId, status },
			{
				headers: {
					'Content-Type': 'application/json',
					'x-service-token': SERVICE_TOKEN
				}
			}
		);
	} catch (notifyError) {
		console.error(`[User Service] Failed to notify friends for user ${userId}:`, notifyError);
	}
}

export default notifyFriends;
