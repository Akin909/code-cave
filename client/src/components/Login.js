//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signIn } from './../actions';
import { Form, Input, Button } from './Styled';

const LoginContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginForm = Form.extend`
  width: 60%;
  height: 80%;
  background-color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = (e: { target: { id: string, value: string } }) => {
    const { target: { id, value } } = e;
    this.setState({ [id]: value });
  };

  handleSubmit = (e: Event) => {
    const { username, password } = this.state;
    e.preventDefault();
    this.props.signIn({ username, password });
  };

  render() {
    const { username, password } = this.state;
    if (this.props.user.signedIn) {
      return <Redirect to="/edit" />;
    }
    return (
      <LoginContainer>
        <LoginForm>
          <Input
            id="username"
            placeholder="username"
            onChange={this.handleChange}
            value={username}
          />
          <Input
            id="password"
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
            value={password}
          />
          <Button onClick={this.handleSubmit}>
            Login
          </Button>
        </LoginForm>
      </LoginContainer>
    );
  }
}

//Login.defaultProps = {};

const mapStateToProps = ({ user }: { user: Object }) => ({
  user
});

export default connect(mapStateToProps, { signIn })(Login);
