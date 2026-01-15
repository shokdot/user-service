import createUserSchema from "./basic/createUser.schema.js";
import getCurrentUserSchema from "./me/getCurrentUser.schema.js";
import getUserByIdSchema from "./basic/getUserById.schema.js";
import updateUserStatusSchema from "./me/updateStatus.schema.js";
import updateUserSchema from "./me/updateUser.schema.js";
import getUserStatusSchema from "./basic/getUserStatus.schema.js";
import deleteUserSchema from "./me/deleteUser.schema.js";
import getUserByNameSchema from "./basic/getUserByName.schema.js";
import searchUserSchema from "./basic/searchUser.schema.js";
import updateStatusSchema from "./basic/updateStatus.schema.js";
import deleteAvatarSchema from "./avatar/deleteAvatar.schema.js";
import updateAvatarSchema from "./avatar/updateAvatar.schema.js";
import blockUserSchema from "./blocked/blockUser.schema.js";
import unblockUserSchema from "./blocked/unblockUser.schema.js";
import getBlockedSchema from "./blocked/getBlocked.schema.js";
import checkBlockSchema from "./blocked/checkBlock.schema.js";
import acceptRequestSchema from "./friends/acceptRequest.schema.js";
import deleteRequestSchema from "./friends/deleteRequest.schema.js";
import sendRequestSchema from "./friends/sendRequest.schema.js";
import listFriendsSchema from "./friends/listFriends.schema.js";

export const basic = {
	createUser: createUserSchema,
	getUserById: getUserByIdSchema,
	getUserStatus: getUserStatusSchema,
	getUserByName: getUserByNameSchema,
	searchUser: searchUserSchema,
	updateStatus: updateStatusSchema
};

export const me = {
	getCurrentUser: getCurrentUserSchema,
	updateUser: updateUserSchema,
	updateUserStatus: updateUserStatusSchema,
	deleteUser: deleteUserSchema
};

export const avatar = {
	deleteAvatar: deleteAvatarSchema,
	updateAvatar: updateAvatarSchema
};

export const blocked = {
	blockUser: blockUserSchema,
	unblockUser: unblockUserSchema,
	getBlockedUsers: getBlockedSchema,
	checkBlock: checkBlockSchema
};

export const friends = {
	acceptRequest: acceptRequestSchema,
	deleteRequest: deleteRequestSchema,
	listFriends: listFriendsSchema,
	sendRequest: sendRequestSchema
};
