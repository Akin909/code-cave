//@flow
import React from 'react';
import { Form as DefaultForm, Title, Input, Button, Error } from './Styled';
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
  users,
  error,
  data
}: //FIXME data annotation
{
  returningUser: Boolean,
  handleChange: (e: Event) => void,
  handleSubmit: (e: Event) => void,
  users: Array<Object>,
  error: String,
  data: Object | void,
  input: Object
}) => (
  <LoginForm>
    <Title>{returningUser ? 'Login' : 'Signup Form'}</Title>
    {(error || //If there is an error from parent state or from apollo
      (data && data.error)) && //Render an error message
      //TODO this complicated comparison is unclear
      <Error>Woops something went wrong 🙇🏾: {error}</Error>}
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
    <Button onClick={handleSubmit}>
      {!returningUser ? 'Sign Up' : 'Login'}
    </Button>
  </LoginForm>
);

export default Form;
