//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { addUserMutation, usersQuery } from './../queries';
import { signIn } from './../actions';
import { Form, StyledLink, Title, Input, Button } from './Styled';

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

const SignInText = styled.h2`
  text-decoration: underline;
  font-weight: 800;
  font-size: 1.2em;
`;

const Error = Title.extend`
  
`;

class Login extends Component {
  state = {
    input: {
      username: '',
      email: '',
      password: ''
    },
    returningUser: false
  };

  handleChange = (e: { target: { id: string, value: string } }) => {
    const { target: { id, value } } = e;
    this.setState({ [id]: value });
  };

  handleSubmit = async (e: Event) => {
    const { mutate, signIn, history } = this.props;
    e.preventDefault();
    //Insert new user info into the DB and await the response which is the user
    //added
    const { data: { addUser: addedUser } } = await mutate({
      variables: { input: this.state.input }
    });
    //Redirect user to editor and add the signed in user to redux store
    signIn(addedUser);
    history.push('/edit');
  };

  signIn() {
    this.setState({ returningUser: !this.state.returningUser });
  }

  render() {
    const { data } = this.props;
    return (
      <LoginContainer>
        <LoginForm>
          <Title>Signup Form</Title>
          {data && data.error && <Error>Woops Something Went Wrong :(</Error>}
          {Object.keys(this.state.input).map(field => {
            const passwordOrEmail = field === 'password' || field === 'email'
              ? field
              : 'text';
            return (
              <Input
                type={passwordOrEmail ? field : 'text'}
                required={passwordOrEmail ? true : false}
                key={field}
                id={field}
                placeholder={field}
                onChange={this.handleChange}
                value={this.state[field]}
              />
            );
          })}
          <Button onClick={this.handleSubmit}>
            Sign Up
          </Button>
          <SignInText onClick={this.signIn}>
            Already Signed up? Click Here
          </SignInText>
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
    options: {
      update: (store: Object, { data: { addUser } }: { data: Object }) => {
        const data = store.readQuery({ query: usersQuery });
        data.users.push(addUser); //Needs to be a mutation
        store.writeQuery({ query: usersQuery, data });
      }
    }
  }),
  connect(mapStateToProps, { signIn })
)(Login);
