import { gql } from '@apollo/client';

export const SignInMutation = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      accessToken
      user {
        name
        email
      }
    }
  }
`;
