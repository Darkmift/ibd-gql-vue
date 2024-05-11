import DbTestSeeds from '@/drizzle/db/seed';

describe('SeedService', () => {
  // test insert builds
  it('should insert builds', async () => {
    const seedService = new DbTestSeeds();
    const builds = await seedService.insertBuilds();
    // expect builds[0] to be an object of {buildId, startTime, endTime, caption, command, status, errorsNumber, warningsNumber}
    expect(builds[0]).toMatchObject({
      insertedId: expect.any(String),
    });
  });

  // test validate has count
  it('should validate has count', async () => {
    const seedService = new DbTestSeeds();
    const count = await seedService.validate();
    expect(count).toBeGreaterThan(0);
  });

  // test delete all builds
  it('should delete all builds', async () => {
    const seedService = new DbTestSeeds();
    const deleteAllBuilds = await seedService.deleteAllBuilds();
    expect(deleteAllBuilds.changes).toBeGreaterThan(0);
  });
});
