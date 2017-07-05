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
      }
    }
  }
`;

export const findUserCode = gql`
  query findUserCode($id: Int!) {
    findCode(id: $id){
      username
      code {
        code
      }
    }
  }
`;
