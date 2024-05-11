import 'tsconfig-paths/register';
import DbTestSeeds from '@/drizzle/db/seed';

export default async () => {
  const dbTestUtilsBuilds = new DbTestSeeds();
  await dbTestUtilsBuilds.deleteAllBuilds();
  await dbTestUtilsBuilds.insertBuilds();
};
