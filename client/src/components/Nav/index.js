import React, { Component } from 'react';
import styled from 'styled-components';

import { StyledLink } from './../Styled';

const NavContainer = styled.header`
  width: 100%;
  height: 3em;
  background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  padding: 0.3em;
`;

const LogoText = styled.h2`
  height: 100%;
  margin: 0;
  padding: 0.2em;
  font-size: 1.2em;
  color: white;
`;

const Links = styled.div`
  height: 100%;
  margin: 0;
  display: flex;

`;

class Nav extends Component {
  render() {
    return (
      <NavContainer>
        <LogoText>Code-Cave</LogoText>
        <Links>
          <StyledLink to="/edit">Editor</StyledLink>
          <StyledLink to="/">Login</StyledLink>
        </Links>
      </NavContainer>
    );
  }
}

export default Nav;
