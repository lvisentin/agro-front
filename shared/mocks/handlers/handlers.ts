import { graphql } from 'msw';
import { MOCK_PROPERTIES } from '../data/properties';

export const handlers = [
  graphql.query('GetPropertyById', (req, res, ctx) => {
    console.log(req.variables)
    return res(ctx.data({
      property: MOCK_PROPERTIES[0]
    }))
  }),


  graphql.query('GetProperties', (req, res, ctx) => {
    return res(ctx.data({
      properties: MOCK_PROPERTIES
    }));
  }),

  graphql.mutation('Login', (req, res, ctx) => {
    const { username } = req.variables;
    sessionStorage.setItem('is-authenticated', username);

    return res(
      ctx.data({
        login: {
          username,
          __typename: 'User',
        },
      })
    );
  }),

  // Handles a "GetUserInfo" query
  graphql.query('GetUserInfo', (req, res, ctx) => {
    const authenticatedUser = sessionStorage.getItem('is-authenticated');

    if (!authenticatedUser) {
      // When not authenticated, respond with an error
      return res(
        ctx.errors([
          {
            message: 'Not authenticated',
            errorType: 'AuthenticationError',
          },
        ])
      );
    }

    // When authenticated, respond with a query payload
    return res(
      ctx.data({
        user: {
          username: authenticatedUser,
          firstName: 'John',
          __typename: 'User',
        },
      })
    );
  }),
];
