import dotenv from 'dotenv';
import logger from '@/common/utils/logger';
import { cleanEnv, num, str, bool } from 'envalid';

// Ensure the test environment file is prioritized during tests
const envFile = `.env.${process.env.NODE_ENV}.local`;
dotenv.config({ path: [envFile, '.env'] });
logger.info(`Loading environment variables from ${envFile}`);

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  JWT_SECRET: str(),
  RUN_DB_LOGS: bool({ default: false }),
  DB_PATH: str({
    default:
      process.env.NODE_ENV === 'test'
        ? 'sqlite-testing.db'
        : 'sqlite-staging.db',
  }),
});

export default env;
