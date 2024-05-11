const typeDefs = `#graphql
  # Comments in GraphQL strings start with the hash (#) symbol.

  # Define status as an enum type
  enum Status {
    SUCCESS
    FAILED
    CANCELLED
  }

  # Define a model for builds
  type BuildModel {
    buildId: String
    startTime: String
    endTime: String
    caption: String
    command: String
    status: Status
    errorsNumber: Int
    warningsNumber: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    builds(page: Int, limit:Int): [BuildModel]
    countBuilds: Int
    build(buildId:String): BuildModel
  }
`;

export default typeDefs;
