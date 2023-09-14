import { Router } from 'express';

const usersRouter = Router();

import userController from '../controllers/user.controller.js';

usersRouter.post('/', userController.createUser)
usersRouter.post('/premium/:uid', userController.updateRol);
usersRouter.post('/auth', userController.authUser);
usersRouter.post('/logout', userController.logOut);
usersRouter.delete('/:uid', userController.deleteUser);

export default usersRouter;
