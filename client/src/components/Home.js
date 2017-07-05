import React, { Component } from 'react';
import styled from 'styled-components';

import { Container, flex } from './Styled';

const Grid = styled.div`
  ${flex};
  flex-wrap: wrap;
  width: 100%;
`;

const CodeBlock = styled.pre`
  margin: 1em;
  padding: 0.5em;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: whitesmoke;
  width: 45%;
  height: 15em;
  text-align: center;
`;

const codebase = [
  'function(){ hello }',
  'Array.from({ length: 2 }, ()=>{})',
  '() => fn => (...args) => args.reduce(arg => fn(arg),fn(...args))'
];

class Home extends Component {
  render() {
    return (
      <Container>
        <Grid row>
          {codebase.map(code => <CodeBlock>{code}</CodeBlock>)}
        </Grid>
      </Container>
    );
  }
}

export default Home;