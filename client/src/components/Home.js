//@flow
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';
import styled from 'styled-components';

import { usersQuery } from './../queries';
import { Container, Title, flex } from './Styled';

const UserTitle = Title.extend`
  color: white;
`;

const Grid = Container.extend`
  align-items: flex-start;
  flex-wrap: wrap;
`;

const CodeBlock = styled(SyntaxHighlighter)`
  margin: 1em;
  padding: 0.5em;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: whitesmoke;
  width: 40%;
  height: 15em;
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
                    style={atomOneDark}
                  >
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
