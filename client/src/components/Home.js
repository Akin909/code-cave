//@flow
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';
import styled from 'styled-components';

import { usersQuery } from './../queries';
import { Container, flex } from './Styled';

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

class Home extends Component {
  render() {
    const { data: { users } } = this.props;
    let codebase;
    if (users) {
      codebase = users.reduce((acc: Array<any>, user: Object) => user.code, []);
    }
    return (
      <Container>
        <Grid row>
          {codebase &&
            codebase.map(({ code, id }: { code: string, id: string }) => (
              <CodeBlock key={id} language="javascript" style={atomOneDark}>
                {code}
              </CodeBlock>
            ))}
        </Grid>
      </Container>
    );
  }
}

export default graphql(usersQuery)(Home);
