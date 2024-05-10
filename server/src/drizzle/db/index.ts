import config from '@/common/config';
import * as schema from './schema';
import logger from '@/common/utils/logger';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database(config.DB_PATH, {
  verbose: (args: unknown) => logger.info({ sqlite: args }),
});

if (config.RUN_DB_LOGS) {
  //log on connection ok
  sqlite.on('open', () => {
    logger.info('sqlite connected');
  });

  // log on connection close
  sqlite.on('close', () => {
    logger.info('sqlite closed');
  });
}

const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite);

export default db;

export { sqlite };

export const seedData = async () => {
  try {
    logger.info('Seeding MYSQL data');
  } catch (error) {
    logger.error('Error seeding data', error);
  }
};
