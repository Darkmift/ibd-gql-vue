import { IBuild } from '@/types/build';
import db from '@/drizzle/db';
import { builds } from '@/drizzle/db/schema';
import { count, eq, sql } from 'drizzle-orm';

export default class BuildsService {
  // insert a build (not in use in exec scope)
  private async insertBuild(build: IBuild) {
    const newBuild = await db
      .insert(builds)
      .values(build)
      .returning({ insertedId: builds.buildId });
    return newBuild;
  }

  // get Build by buildId
  async getBuildById(buildId: string) {
    const prepared = db
      .select()
      .from(builds)
      .where(eq(builds.buildId, sql.placeholder('buildId')));
    const build = await prepared.get({ buildId });
    return build;
  }

  // get total count of builds
  async getTotalBuilds() {
    const result = await db.select({ count: count() }).from(builds);
    return result[0].count;
  }

  // get paginated
  async getPaginatedBuilds(page = 1, limit = 10) {
    const results = await db
      .select()
      .from(builds)
      .limit(limit)
      .offset(page * limit);
    return results;
  }
}
