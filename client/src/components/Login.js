//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { addUserMutation, usersQuery } from './../queries';
import { signIn } from './../actions';
import { StyledLink, Title, Input, Button } from './Styled';

import Form from './Form';

const LoginContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignInText = styled.h2`
  text-decoration: underline;
  font-weight: 800;
  font-size: 1.2em;
  color: white;
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
    returningUser: false,
    error: ''
  };

  handleChange = (e: { target: { id: string, value: string } }) => {
    const { target: { id, value } } = e;
    this.setState({
      ...this.state,
      input: {
        ...this.state.input,
        [id]: value
      }
    });
  };

  handleSubmit = async (e: Event) => {
    const { mutate, signIn, history } = this.props;
    e.preventDefault();
    const { input } = this.state;
    Object.values(input).forEach((value: string) => {
      if (!value.length) {
        //TODO handle this better
        return;
      }
    });
    //Insert new user info into the DB and await the response which is the user
    //added
    const { data: { addUser: addedUser } } = await mutate({
      variables: { input }
    });
    //Redirect user to editor and add the signed in user to redux store
    signIn(addedUser);
    history.push('/edit');
  };

  signIn = () => {
    //This state should be transient as it is only relevant when the user is
    //here
    this.setState({ returningUser: !this.state.returningUser });
  };

  generateProps = (propsObj: Object | void) => ({
    ...this.state,
    ...this.props,
    ...propsObj,
    handleChange: this.handleChange,
    handleSubmit: this.handleSubmit
  });

  render() {
    const props = this.generateProps();
    return (
      <LoginContainer>
        <Form {...props} returningUser={this.state.returningUser} />
        <SignInText onClick={this.signIn}>
          Already Signed up? Click Here
        </SignInText>
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
