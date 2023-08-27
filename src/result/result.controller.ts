import Result from '../models/Result';
import { EResult } from './constants';
import logger from '../logger';

class resultController {
  async createResult(req, res) {
    try {
      const { uId, pId, pages, title } = req.body;
      const result = new Result({
        uId,
        pId,
        title,
        pages,
      });
      await result.save();
      return res.json({ message: EResult.RESULT_CREATED });
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EResult.RESULT_CREATE_ERROR });
    }
  }

  async getAllResult(req, res) {
    try {
      const results = await Result.find();
      res.json(results);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EResult.RESULT_FIND_ERROR });
    }
  }

  async getResultsById(req, res) {
    try {
      const { id } = req.params;
      const result = await Result.findById(id);
      res.json(result);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EResult.RESULT_FIND_ERROR });
    }
  }

  async getResultsByUser(req, res) {
    try {
      const { id } = req.params;
      const results = await Result.find({ uId: id });
      res.json(results);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EResult.RESULT_FIND_ERROR });
    }
  }

  async getResultsByPoll(req, res) {
    try {
      const { id } = req.params;
      const results = await Result.find({ pId: id });
      res.json(results);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: "Error! Result didn't find!" });
    }
  }

  async countResultsByPoll(req, res) {
    try {
      const { id } = req.params;
      const results = await Result.countDocuments({ pId: id });
      res.json(results);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EResult.RESULT_FIND_ERROR });
    }
  }

  async checkUserResult(req, res) {
    try {
      const { uId, pId } = req.body;
      const result = await Result.findOne({ pId: pId, uId: uId });
      res.json(!!result);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EResult.RESULT_FIND_ERROR });
    }
  }
}

export default new resultController();
