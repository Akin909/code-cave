//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { addUserMutation } from './../queries';
import { signIn } from './../actions';
import { Form, Title, Input, Button } from './Styled';

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
  padding: 2em;
  background-color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Login extends Component {
  state = {
    username: '',
    firstname: '',
    surname: '',
    password: ''
  };

  handleChange = (e: { target: { id: string, value: string } }) => {
    const { target: { id, value } } = e;
    this.setState({ [id]: value });
  };

  handleSubmit = (e: Event) => {
    const { username, password, firstname, surname } = this.state;
    const { mutate, signIn } = this.props;
    e.preventDefault();
    mutate({ variables: { firstname, surname, username, password } });
    signIn({ username, firstname, surname });
  };

  render() {
    const { username, password } = this.state;
    if (this.props.user.signedIn) {
      return <Redirect to="/edit" />;
    }
    return (
      <LoginContainer>
        <LoginForm>
          <Title>Signup Form</Title>
          {Object.keys(this.state).map(field => (
            <Input
              type={field === 'password' && 'password'}
              key={field}
              id={field}
              placeholder={field}
              onChange={this.handleChange}
              value={this.state[field]}
            />
          ))}
          <Button onClick={this.handleSubmit}>
            Login
          </Button>
        </LoginForm>
      </LoginContainer>
    );
  }
}

const mapStateToProps = ({ user }: { user: Object }) => ({
  user
});

export default compose(
  graphql(addUserMutation, {
    options: ({
      username,
      firstname,
      surname,
      password
    }: {
      username: string,
      firstname: string,
      surname: string,
      password: string
    }) => ({
      variables: { username, firstname, surname, password }
    })
  }),
  connect(mapStateToProps, { signIn })
)(Login);
