import { ApolloServer } from '@apollo/server';
import app from '@/index';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers } from './resolvers';
import typeDefs from './typedefs';
import logger from '@/common/utils/logger';
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const initGQL = async () => {
  await server.start();
  app.use(expressMiddleware(server));
  logger.info('Apollo Server started');
};

export { typeDefs, resolvers, server };

export default initGQL;
