import User from '../models/User';
import { EUser } from './constants';
import logger from '../logger';

class usersController {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EUser.USERS_DID_NOT_FIND });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.json(user);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EUser.USER_DID_NOT_FIND });
    }
  }

  async deleteUserById(req, res) {
    try {
      const { id } = req.body;
      const user = await User.deleteOne({ _id: id });
      res.json(user);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EUser.USER_DID_NOT_DELETE });
    }
  }

  async updateUser(req, res) {
    try {
      const { id, username, email, roles } = req.body;
      const user = await User.updateOne(
        { _id: id },
        {
          ...(username && { username }),
          ...(email && { email }),
          ...(roles && { roles }),
        },
      );
      res.json(user);
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: EUser.USER_DID_NOT_UPDATE });
    }
  }
}

export default new usersController();
