import React, { Component } from 'react';
import styled from 'styled-components';

const NavContainer = styled.header`
  width: 100%;
  height: 10%;
  background-color: skyblue;
  dislay: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.h2`
  width: 10%;
  height: 100%;
  margin: 0;
  padding: 0.2em;
  font-size: 1.2em;
  color: white;
`;

class Nav extends Component {
  render() {
    return (
      <NavContainer>
        <LogoText>Code-Cave</LogoText>
      </NavContainer>
    );
  }
}

export default Nav;
