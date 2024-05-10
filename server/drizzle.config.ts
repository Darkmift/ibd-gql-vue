import { defineConfig } from 'drizzle-kit';
import config from './src/common/config';

export default defineConfig({
  schema: './src/drizzle/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: config.DB_PATH,
  },
  verbose: true,
  strict: true,
});
