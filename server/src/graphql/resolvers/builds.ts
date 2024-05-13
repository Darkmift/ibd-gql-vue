import logger from '@/common/utils/logger';
import BuildsService from '@/services/builds.service';

const buildsService = new BuildsService();

const buildsResolvers = {
  Query: {
    async builds(_, { page, limit }) {
      try {
        return await buildsService.getPaginatedBuilds(page, limit);
      } catch (error) {
        logger.error(error);
        throw new Error('Failed to fetch builds.');
      }
    },

    async countBuilds() {
      try {
        return await buildsService.getTotalBuilds();
      } catch (error) {
        logger.error(error);
        throw new Error('Failed to fetch builds.');
      }
    },

    async build(_, { buildId }) {
      try {
        return await buildsService.getBuildById(buildId);
      } catch (error) {
        logger.error(error);
        throw new Error('Failed to fetch build.');
      }
    },

    async buildsGroupedByDay() {
      try {
        const results = await buildsService.getBuildsGroupedByDay();
        return results;
      } catch (error) {
        logger.error(error);
        throw new Error('Failed to fetch builds.');
      }
    },
  },
  // Mutation: {
  //   async createBuild(_, { input }) {
  //     const build = await buildsService.insertBuild(input);
  //     return build;
  //   },
  // },
};
export default buildsResolvers;
