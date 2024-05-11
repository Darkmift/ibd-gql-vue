import gql from 'graphql-tag';
import { server } from '@/graphql/server';
import { IBuild } from '@/types/build';

describe('GraphQL Server', () => {
  it('fetches build', async () => {
    const queryData = {
      query: gql`
        query FuckingQuery($page: Int, $limit: Int) {
          builds(page: $page, limit: $limit) {
            buildId
            command
            warningsNumber
          }
        }
      `,
      variables: { page: 1, limit: 2 },
    };

    const { body } = await server.executeOperation<{ builds: IBuild[] }>(
      queryData,
    );

    if (body.kind === 'single') {
      expect(body.singleResult.data).toBeDefined();
      const result = body.singleResult.data;
      // expect builds to be array of {buildId,command,warningsNumber}
      expect(result?.builds).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            buildId: expect.any(String),
            command: expect.any(String),
            warningsNumber: expect.any(Number),
          }),
        ]),
      );
    } else {
      fail('failed to get desired response');
    }
  });
});
