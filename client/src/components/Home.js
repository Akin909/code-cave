//@flow
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';
import styled from 'styled-components';

import { usersQuery } from './../queries';
import { Container, Title, flex } from './Styled';

const Grid = styled.div`
  ${flex};
  flex-wrap: wrap;
  width: 100%;
`;

const CodeBlock = styled(SyntaxHighlighter)`
  margin: 1em;
  padding: 0.5em;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: whitesmoke;
  width: 45%;
  height: 15em;
  text-align: center;
`;

const UserContainer = styled.div`
  ${flex};
  width: 100%;
`;

class Home extends Component {
  render() {
    const { data: { users } } = this.props;
    return (
      <Container>
        {users &&
          users.map(user => (
            <UserContainer key={user.id}>
              <Title>
                {user.code.length > 0 && user.username}
              </Title>
              <Grid key={user.id}>
                {user.code.map(({ code, id }: { code: string, id: string }) => (
                  <CodeBlock key={id} language="javascript" style={atomOneDark}>
                    {code}
                  </CodeBlock>
                ))}
              </Grid>
            </UserContainer>
          ))}
      </Container>
    );
  }
}

export default graphql(usersQuery)(Home);
