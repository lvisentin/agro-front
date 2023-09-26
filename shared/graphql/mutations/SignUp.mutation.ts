import { gql } from '@apollo/client';

export const SignUpMutation = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(signUpInput: $input) {
      accessToken
    }
  }
`;
