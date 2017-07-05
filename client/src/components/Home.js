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
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: whitesmoke;
  width: 30%;
  height: 15em;
`;

const codebase = ['function(){ hello }', 'Array.from({ length: 2 }, ()=>{})'];

class Home extends Component {
  render() {
    return (
      <Container>
        Home
        <Grid>
          {codebase.map(code => <CodeBlock>{code}</CodeBlock>)}
        </Grid>
      </Container>
    );
  }
}

export default Home;
