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
import { Title, RoundButton, Button, Container } from './Styled';
import {
  saveCode,
  changeTheme,
  changeFontSize,
  changeLanguage
} from './../actions/';

import Options from './Options';

const MenuButton = RoundButton.extend`
  top:  1em;
  left: 1em;
  position: absolute;
`;

const EditorContainer = Container.extend`
  position: relative;
  height: 100%;
`;

const CodeEditor = styled(AceEditor)`
  width: 80%;
  height: 50%;
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

  componentWillReceiveProps() {
    this.isUserLoggedIn();
  }

  isUserLoggedIn = () => {
    const { user } = this.props;
    if (user.signedIn) {
      //console.log('user', user);
      //if (users) {
      //const currentUser = users.find(
      //user => user.username === user.signedIn.username
      //);
      //console.log('currentUser', currentUser);
      //}
    }
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

  saveCurrentCode = (code: string) => {
    this.props.saveCode(code);
  };

  render() {
    console.log('this.props', this.props);
    const props = this.generateProps();
    const { theme, language } = this.props.editorConfig;
    return (
      <EditorContainer>
        <Options handleMenuClick={this.handleMenuClick} {...props} />
        <Title>Editor</Title>
        <MenuButton
          visible={this.state.visible}
          onClick={this.handleMenuClick}
        />
        <CodeEditor
          enableBasicAutoCompletion={true}
          width={'50%'}
          height={'80%'}
          value={this.state.code}
          onChange={this.handleChange}
          mode={language}
          theme={theme}
        />
        <Button onClick={this.saveCurrentCode}>Save Code</Button>
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
  graphql(queries.findUserCode, {
    options: (props: Object) => ({
      variables: { id: !props.user ? 1 : props.user.id }
    })
  }),
  connect(mapStateToProps, {
    saveCode,
    changeFontSize,
    changeTheme,
    changeLanguage
  })
)(Editor);
