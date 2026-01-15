import { FastifyInstance } from "fastify";
import { basic } from '@schemas/index.js'
import {
	createUserHandler,
	getUserByIdHandler,
	getUserStatusHandler,
	updateStatusHandler,
	getUserByNameHandler,
	searchUserHandler
} from '@controllers/basic/index.js'

const basicRoutes = async (app: FastifyInstance) => {
	app.post('/', basic.createUser, createUserHandler);
	app.get('/:userId', basic.getUserById, getUserByIdHandler);
	app.get('/status/:userId', basic.getUserStatus, getUserStatusHandler); // check it // change it if need it
	app.patch('/:userId/status', basic.updateStatus, updateStatusHandler);
	app.get('/username/:username', basic.getUserByName, getUserByNameHandler);
	app.get('/search', basic.searchUser, searchUserHandler);
}

export default basicRoutes;
