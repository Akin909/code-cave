import { gql } from 'react-apollo';

export const usersQuery = gql`
  query Users {
    users {
      id
      firstname
      surname
      username
    }
  }
`;

export const findUserCode = gql`
  query findUserCode($id: Int!) {
    findCode(id: $id){
      code
    }
  }
`;
