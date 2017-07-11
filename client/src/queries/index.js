import { gql } from 'react-apollo';

export const usersQuery = gql`
  query Users {
    users {
      id
      email
      username
      code {
        code
        id
      }
    }
  }
`;

export const findUser = gql`
  query findUserQuery($input: UserInput!) {
    findUser(input: $input){
      isUser
      error
      user {
        username
        email
        id
        code {
          code
          user_id
          id
        }
      }
    }
  }
`;

export const findUserCode = gql`
  query findUserCode($id: Int!) {
    findCode(id: $id){
      user_id
      code
    }
  }
`;

export const addCodeMutation = gql`
  mutation addCodeMutation($user_id: Int! $code:String!){
  addCode(user_id: $user_id code: $code){
      submittedCode {
        id
        user_id
        code
      }
      err
    }
  }
`;

export const addUserMutation = gql`
  mutation addUserMutation($input: AddUserInput!){
    addUser(input: $input) {
      username
      email
      id
    }
  }
`;
