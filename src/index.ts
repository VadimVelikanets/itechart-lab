import * as process from 'process';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app';
import corsMiddleware from './middleware/cors.middleware';
import authRouter from './auth/auth.router';
import pollRouter from './poll/poll.router';
import resultRouter from './result/result.router';
import usersRouter from './users/users.router';
import logger from './logger';

dotenv.config();
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 8080;

app.use(corsMiddleware);
app.use('/auth', authRouter);
app.use('/poll', pollRouter);
app.use('/result', resultRouter);
app.use('/users', usersRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    app.listen(PORT, () => logger.info(`Server started on port ${process.env.PORT}`));
  } catch (e) {
    logger.error(e);
  }
};

start();
