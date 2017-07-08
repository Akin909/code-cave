//@flow
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import { usersQuery } from './../queries';
import { Container, Title, flex, Grid } from './Styled';
import CodeBlock from './CodeBlock';

const UserTitle = Title.extend`
  color: white;
`;


const UserContainer = styled.div`
  ${flex};
  width: 100%;
  height: 100%;
`;

class Home extends Component {
  render() {
    const { data: { users } } = this.props;
    if (users) {
      const userCode = users
        .filter(user => user.code.length)
        .map(user => user.code);
    }
    return (
      <Container>
        {users &&
          users.filter(user => user.code.length).map((user: Object) => (
            <UserContainer key={user.id}>
              <UserTitle>
                {user.username}
              </UserTitle>
              <Grid row>
                {user.code.map(({ code, id }: { code: string, id: string }) => (
                  <CodeBlock
                    showLineNumbers
                    key={id}
                    language="javascript"
                    style="atomOneDark"
                    code={code}
                  />
                ))}
              </Grid>
            </UserContainer>
          ))}
      </Container>
    );
  }
}

export default graphql(usersQuery)(Home);
