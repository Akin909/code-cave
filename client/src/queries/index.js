import { gql } from 'react-apollo';

export default gql`
  query Users {
    users {
      id
      firstname
      surname
      username
    }
  }
`;
