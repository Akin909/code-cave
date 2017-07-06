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
  addCode(user_id: $user_id code: $code){
      user_id
      code
    }
  }
`;

export const addUserMutation = gql`
  mutation addUserMutation($firstname: String! $surname: String! $password: String! $username: String!){
    addUser(firstname: $firstname surname: $surname username: $username password: $password) {
      firstname
      surname
      username
      id
    }
  }
`;
