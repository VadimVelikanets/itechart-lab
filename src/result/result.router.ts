import { Router } from 'express';
import resultController from './result.controller';
const resultRouter = Router();
resultRouter.post('/create', resultController.createResult);

resultRouter.get('/', resultController.getAllResult);
resultRouter.get('/:id', resultController.getResultsById);

resultRouter.get('/user/:id', resultController.getResultsByUser);

resultRouter.get('/poll/:id', resultController.getResultsByPoll);

resultRouter.get('/count/:id', resultController.countResultsByPoll);

resultRouter.post('/check', resultController.checkUserResult);

export default resultRouter;
