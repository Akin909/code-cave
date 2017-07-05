import React, { Component } from 'react';
import styled from 'styled-components';

import { StyledLink } from './Styled';
import lambda from './../assets/lambda.png';

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
  font-size: 1.5em;
  color: white;
  align-self: center;
  text-shadow: -1px 1px 0 rgba(0, 0, 0, 0.5);
`;

const LogoIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const Links = styled.div`
  height: 100%;
  margin: 0;
  display: flex;
`;

const LogoContainer = Links.extend``;

class Nav extends Component {
  render() {
    return (
      <NavContainer>
        <LogoContainer>
          <LogoText>CodeCave</LogoText>
          <LogoIcon src={lambda} />
        </LogoContainer>
        <Links>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/edit">Editor</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
        </Links>
      </NavContainer>
    );
  }
}

export default Nav;
