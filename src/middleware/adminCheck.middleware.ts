import jwt from 'jsonwebtoken';
import * as process from 'process';

import { EUser } from '../users/constants';
import logger from '../logger';

function adminCheckMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: req.headers });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    const isAdmin = decoded.roles.includes('ADMIN');
    logger.info(decoded);
    if (isAdmin) {
      return next();
    } else {
      logger.error(EUser.USER_NOT_ADMIN);
      return res.status(403).json({ message: EUser.USER_NOT_ADMIN });
    }
  } catch (e) {
    return res.status(401).json({ message: EUser.USER_NOT_ADMIN });
  }
}

export default adminCheckMiddleware;
