import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { logout } from './../actions';
import { StyledLink } from './Styled';
import lambda from './../assets/lambda.png';

const DarkLink = StyledLink.extend`
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0.3em;
  transition: background-color 0.15s ease-in;
  &:hover {
    background-color: black;
  }
`;

const DarkLinkStyles = DarkLink.withComponent('div');

const Logout = DarkLinkStyles.extend`
  justify-content: flex-start;
  background-color: #172232;
  border: none;
`;

// Idea for dark nav #383838;
const NavContainer = styled.header`
  width: 100%;
  height: 3em;
  background-color: #172232;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
`;

const UserGreeting = LogoText.extend`
  font-size: 1.2em;
  text-align: center;
`;

const LogoContainer = Links.extend``;

const Nav = ({
  signedIn,
  logout
}: {
  signedIn: Object,
  logout: void => Object
}) => (
  <NavContainer>
    <LogoContainer>
      <LogoText>CodeCave</LogoText>
      {/*<LogoIcon src={lambda} /> */}
    </LogoContainer>
    {signedIn && <UserGreeting>Hi, {signedIn.username}</UserGreeting>}
    <Links>
      <DarkLink to="/">Home</DarkLink>
      <DarkLink to="/edit">Editor</DarkLink>
      {signedIn
        ? <Logout onClick={logout}>Logout</Logout>
        : <DarkLink to="/login">Login</DarkLink>}
    </Links>
  </NavContainer>
);

const mapStateToProps = ({ user: { signedIn } }: { signedIn: Object }) => ({
  signedIn
});

export default connect(mapStateToProps, { logout })(Nav);
