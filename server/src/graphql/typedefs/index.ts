const typeDefs = `#graphql
  # Comments in GraphQL strings start with the hash (#) symbol.

  # Define status as an enum type
  enum Status {
    success
    failed
    cancelled
  }

  # Define a model for builds
  type BuildModel {
    buildId: String
    startTime: String
    endTime: String
    caption: String
    command: String
    status: String
    errorsNumber: Int
    warningsNumber: Int
  }

  # Define a model for builds grouped by day
  type BuildGroupedByDay {
    day: String
    count: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    builds(page: Int, limit:Int): [BuildModel]
    countBuilds: Int
    build(buildId:String): BuildModel
    buildsGroupedByDay: [BuildGroupedByDay]
  }
`;

export default typeDefs;
