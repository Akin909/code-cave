import { gql } from 'react-apollo';

export const usersQuery = gql`
  query Users {
    users {
      id
      firstname
      surname
      username
      code {
        code
        id
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
  addCode(user_id: $id code: $code)
    id
    code
  }
`;
