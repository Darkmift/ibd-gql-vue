// Path: server/src/drizzle/db/seed.ts
import { IBuild } from '@/types/build';
import { count } from 'drizzle-orm';
import db from '@/drizzle/db';
import { builds } from '@/drizzle/db/schema';
import fs from 'fs';
import path from 'path';

const pathToCSV = path.resolve(
  __dirname,
  '@/../../../../../assests/mock/json/MOCK_BUILDS_SEED.csv',
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
        buildId: buildId,
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
  // insert a build
  public async insertBuilds() {
    const buildsData: IBuild[] = this.getCsvData();
    const newBuilds = await db
      .insert(builds)
      .values(buildsData.slice(0, 10))
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
