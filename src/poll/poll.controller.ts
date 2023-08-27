import Poll from '../models/Poll';
import { EPoll } from './constants';
import logger from '../logger';

class pollController {
  async createPoll(req, res) {
    try {
      const { uId, pages, title } = req.body;
      const poll = new Poll({
        uId,
        title,
        pages,
      });
      await poll.save();
      return res.json({ message: EPoll.POLL_CREATED });
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EPoll.POLL_DID_NOT_CREATE });
    }
  }

  async getAllPolls(req, res) {
    try {
      const polls = await Poll.find();
      res.json(polls);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EPoll.POLLS_DID_NOT_FIND });
    }
  }

  async getPollById(req, res) {
    try {
      const { id } = req.params;
      const poll = await Poll.findById(id);
      res.json(poll);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EPoll.POLL_DID_NOT_FIND });
    }
  }

  async getPollsByUser(req, res) {
    try {
      const { id } = req.params;
      const polls = await Poll.find({ uId: id });
      res.json(polls);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EPoll.POLLS_DID_NOT_FIND });
    }
  }
  async deletePollById(req, res) {
    try {
      const { id } = req.body;
      const poll = await Poll.deleteOne({ _id: id });
      res.json(poll);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EPoll.POLL_DID_NOT_DELETE });
    }
  }

  async updatePoll(req, res) {
    try {
      const { id, title, pages } = req.body;
      const poll = await Poll.updateOne(
        { _id: id },
        {
          title,
          pages,
          updated_at: Date.now(),
        },
      );
      res.json(poll);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EPoll.POLLS_DID_NOT_UPDATE });
    }
  }
}

export default new pollController();
