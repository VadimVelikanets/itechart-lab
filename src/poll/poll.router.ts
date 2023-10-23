import { Router } from 'express';
import pollController from './poll.controller';
const pollRouter = Router();

pollRouter.post('/create', pollController.createPoll);

pollRouter.get('/', pollController.getAllPolls);
pollRouter.get('/:id', pollController.getPollById);

pollRouter.get('/user/:id', pollController.getPollsByUser);

pollRouter.delete('/', pollController.deletePollById);

pollRouter.put('/', pollController.updatePoll);
export default pollRouter;
