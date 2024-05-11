import cors from 'cors';
import env from '@/common/config';
import logger from '@/common/utils/logger';
import app from './src/index';
import initGQL from '@/graphql/server';
import { seedStaging } from '@/drizzle/db/seed';

app.use(cors());
seedStaging();
initGQL();

app.listen(env.PORT, () => {
  logger.info(`Environment: ${env.NODE_ENV}`);
  logger.info(`Server is running on http://localhost:${env.PORT}`);
});
