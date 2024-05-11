// Path: server/src/drizzle/db/seed.ts
import { IBuild } from '@/types/build';
import { count } from 'drizzle-orm';
import db from '@/drizzle/db';
import { builds } from '@/drizzle/db/schema';
import fs from 'fs';
import path from 'path';
import logger from '@/common/utils/logger';

const currentPath = path.resolve();
const pathToCSV = path.resolve(
  currentPath,
  '..',
  'assests/mock/json/MOCK_BUILDS_SEED.csv',
);

export default class DbTestSeeds {
  private getCsvData() {
    const data = fs.readFileSync(pathToCSV, 'utf8');
    const rows = data.split('\n');
    rows.shift();
    const csvToJsonData = rows.map((line) => {
      const [
        status,
        buildId,
        caption,
        command,
        startTime,
        endTime,
        errorsNumber,
        warningsNumber,
      ] = line.split(',');
      return {
        buildId,
        startTime,
        endTime,
        caption,
        command,
        status,
        errorsNumber: parseInt(errorsNumber),
        warningsNumber: parseInt(warningsNumber),
      } as IBuild;
    });

    return csvToJsonData;
  }

  private filterUniqueBuilds() {
    const data = this.getCsvData();
    const uniqueBuilds = data.filter(
      (build, index, self) =>
        index === self.findIndex((t) => t.buildId === build.buildId),
    );
    return uniqueBuilds;
  }

  // insert a build
  public async insertBuilds() {
    const buildsData: IBuild[] = this.filterUniqueBuilds();
    const newBuilds = await db
      .insert(builds)
      .values(buildsData)
      .returning({ insertedId: builds.buildId });
    return newBuilds;
  }
  public async validate() {
    // get count
    const result = await db.select({ count: count() }).from(builds);
    return result[0].count;
  }
  // delete all builds
  public async deleteAllBuilds() {
    return await db.delete(builds);
  }
}

export const seedStaging = async () => {
  // if builds table empty seed it
  const dbTestSeeds = new DbTestSeeds();
  const count = await dbTestSeeds.validate();
  if (count === 0) {
    await dbTestSeeds.insertBuilds();
    logger.info('Seeding completed');
    return;
  }
  logger.info('Seeding skipped -- already seeded');
};
