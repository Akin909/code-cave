//@flow
import React from 'react';
import { Form as DefaultForm, Title, Input, Button } from './Styled';
import styled from 'styled-components';

const LoginForm = DefaultForm.extend`
  width: 60%;
  height: 80%;
  padding: 2em;
  background-color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = ({
  input,
  handleChange,
  handleSubmit,
  returningUser,
  error,
  data
}: //FIXME data annotation
{
  returningUser: boolean,
  handleChange: (e: Event) => void,
  handleSubmit: (e: Event) => void,
  error: String,
  data: Object | void,
  input: Object
}) => (
  <LoginForm>
    <Title>{returningUser ? 'Login' : 'Signup Form'}</Title>
    {error || //If there is an error from parent state or from apollo
      (data &&
      data.error && //Render an error message
        //TODO this complicated comparison is unclear
        <Error>Woops Something Went Wrong: {error}</Error>)}
    {Object.keys(input).map(field => {
      if (returningUser && field === 'email') {
        return null;
      }
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
          onChange={handleChange}
          value={input[field]}
        />
      );
    })}
    {!returningUser
      ? <Button onClick={handleSubmit}>
          Sign Up
        </Button>
      : <Button>Login</Button>}
  </LoginForm>
);

export default Form;
