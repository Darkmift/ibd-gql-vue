import buildsResolvers from './builds';

export const resolvers = {
  Query: {
    builds: (_, args) => buildsResolvers.Query.builds(_, args),
    countBuilds: () => buildsResolvers.Query.countBuilds(),
    build: (_, args) => buildsResolvers.Query.build(_, args),
  },
};
