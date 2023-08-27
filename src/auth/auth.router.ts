import { Router } from 'express';
import authController from './auth.controller';
import { check } from 'express-validator';
import authMiddleware from '../middleware/auth.middleware';
const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post(
  '/registration',
  [
    check('username', 'Username should not be empty').notEmpty().isLength({ min: 3, max: 20 }),
    check('email', 'Email should not be empty').notEmpty().isEmail().isLength({ min: 6, max: 20 }),
    check('password', 'Should should be at least 8 symbols').notEmpty().isLength({ min: 8, max: 20 }),
  ],
  authController.registration,
);
authRouter.get('/auth', authMiddleware, authController.authorization);

export default authRouter;
