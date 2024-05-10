import jwt from 'jsonwebtoken';
import config from '@/common/config';
import logger from '@/common/utils/logger';
import User from '@/types/user';

export const generateToken = (payload: Omit<User, 'password'>) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): User | null => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    logger.error('JWT verify failed', (error as Error).message);
    return null;
  }
};
