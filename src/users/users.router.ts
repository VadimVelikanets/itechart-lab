import { Router } from 'express';
import adminCheckMiddleware from '../middleware/adminCheck.middleware';
import usersController from './users.controller';

const usersRouter = Router();

usersRouter.get('/', adminCheckMiddleware, usersController.getAllUsers);
usersRouter.get('/:id', adminCheckMiddleware, usersController.getUserById);

usersRouter.delete('/', adminCheckMiddleware, usersController.deleteUserById);
usersRouter.put('/', adminCheckMiddleware, usersController.updateUser);

export default usersRouter;
