//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';

import { saveCode } from './../actions';
import { usersQuery } from './../queries';
import { Container, Title, flex, Grid } from './Styled';
import CodeBlock from './CodeBlock';

const UserTitle = Title.extend`
  color: white;
`;

const UserContainer = styled.div`
  ${flex};
  width: 100%;
  height: 100%;
`;

class Home extends Component {
  props = {
    saveCode: string => Object,
    data: Object,
    users: Array
  };

  editCode = code => {
    const { saveCode, history: { push } } = this.props;
    saveCode(code);
    push('/edit');
  };
  render() {
    const { data: { users } } = this.props;
    return (
      <Container>
        {users &&
          users.filter(user => user.code.length).map((user: Object) => (
            <UserContainer key={user.id}>
              <UserTitle>
                {user.username}
              </UserTitle>
              <Grid row>
                {user.code.map(({ code, id }: { code: string, id: string }) => (
                  <CodeBlock
                    showLineNumbers
                    key={id}
                    language="javascript"
                    style="atomOneDark"
                    code={code}
                    editCode={this.editCode}
                  />
                ))}
              </Grid>
            </UserContainer>
          ))}
      </Container>
    );
  }
}

export default compose(connect(null, { saveCode }), graphql(usersQuery))(Home);
