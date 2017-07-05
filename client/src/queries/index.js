import { gql } from 'react-apollo';

export const usersQuery = gql`
  query Users {
    users {
      id
      firstname
      surname
      username
      code
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
