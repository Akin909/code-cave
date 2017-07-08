//@flow
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/theme/tomorrow_night';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/solarized_dark';
import 'brace/theme/terminal';
import 'brace/theme/textmate';

import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/ruby';

import * as queries from './../queries/';
import { Title, RoundButton, Button, Container, flex } from './Styled';

import {
  saveCode,
  changeTheme,
  changeFontSize,
  changeLanguage
} from './../actions/';

import Options from './Options';
import CodeBlock from './CodeBlock';

const SaveButton = Button.extend`
  font-size: 1.3em;
  margin: 0.5em;
  min-width: 8em;
  width: auto;
`;

const MenuButton = RoundButton.extend`
  top:  1em;
  left: 1em;
  position: absolute;
`;

const EditorContainer = Container.extend`
  flex-direction: column;
  position: relative;
  height: 100vh;
`;

const EditorViews = styled.div`
  width: 100%;
  height: 100%;
  ${flex}
`;

const CodeEditor = styled(AceEditor)`
  width: 80%;
  height: 100%;
  box-shadow: -1px 2px 0 rgba(0, 0, 0, 0.5);
  margin: 0.2em;
`;

class Editor extends Component {
  state = {
    code: '',
    visible: false,
    languages: ['javascript', 'java', 'ruby'],
    themes: [
      'tomorrow_night',
      'monokai',
      'github',
      'tomorrow',
      'textmate',
      'solarized_dark',
      'terminal'
    ]
  };

  generateProps = (propsObj: Object | void) => ({
    ...this.state,
    ...this.props,
    ...propsObj
  });

  handleMenuClick = (e: Event) => {
    this.setState({ visible: !this.state.visible });
  };

  handleChange = (code: string) => {
    this.setState({ code });
  };

  saveCurrentCode = async () => {
    const { code } = this.state;
    const { user: { signedIn }, mutate, history } = this.props;
    this.props.saveCode(code);
    if (signedIn) {
      const received = await mutate({
        variables: {
          code,
          user_id: signedIn.id
        }
      });
    } else {
      history.push('/login');
    }
  };

  renderUserCode = signedIn => {
    return signedIn.code.map(({ code, id }) => (
      <CodeBlock
        code={code}
        language="javascript"
        style="atomOneDark"
        key={id}
      />
    ));
  };

  render() {
    const props = this.generateProps({ onClick: this.handleMenuClick });
    const {
      editorConfig: { theme, language },
      user: { signedIn },
      data: { users }
    } = this.props;
    return (
      <EditorContainer row>
        <Options {...props} />
        <Title>Editor</Title>
        <MenuButton {...props} />
        <EditorViews>
          <CodeEditor
            enableBasicAutoCompletion={true}
            width={'70%'}
            height={'35em'}
            value={this.state.code}
            onChange={this.handleChange}
            mode={language}
            theme={theme}
          />
          <SaveButton onClick={this.saveCurrentCode}>
            {signedIn ? 'Save' : 'Sign in to Save'}
          </SaveButton>
        </EditorViews>
        {signedIn && <div>{this.renderUserCode(signedIn)}</div>}
      </EditorContainer>
    );
  }
}

const mapStateToProps = ({
  user,
  editorConfig
}: {
  user: Object,
  editorConfig: Object
}) => ({
  editorConfig,
  user
});

export default compose(
  graphql(queries.usersQuery),
  //TODO compose does not work with two queries in this fashion
  graphql(queries.findUserCode, {
    skip: (props: Object) => !props.user || !props.user.signedIn,
    options: ({ user }: { user: Object }) => ({
      variables: { id: user.signedIn.id }
    })
  }),
  graphql(queries.addCodeMutation, {
    options: ({ user_id, code }: { user_id: string, code: string }) => ({
      variables: { user_id, code },
      updateQueries: {
        query: queries.usersQuery
      }
    })
  }),
  connect(mapStateToProps, {
    saveCode,
    changeFontSize,
    changeTheme,
    changeLanguage
  })
)(Editor);
