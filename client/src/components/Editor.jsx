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

import queries from './../queries/';
import { Title, Button } from './Styled';
import {
  saveCode,
  changeTheme,
  changeFontSize,
  changeLanguage
} from './../actions/';

import Options from './Options';

const MenuButton = styled(Button)`
  top:  1em;
  left: 1em;
  position: absolute;
`;

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: cream;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  generateProps = propsObj => ({
    ...this.state,
    ...this.props,
    ...propsObj
  });

  handleMenuClick = e => {
    this.setState({ visible: !this.state.visible });
  };

  handleChange = code => {
    //console.log('code', code);
    this.setState({ code });
    this.props.saveCode(code);
  };

  render() {
    const props = this.generateProps();
    const { theme, language } = this.props.editorConfig;
    console.log('theme', theme);
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
      </EditorContainer>
    );
  }
}

const mapStateToProps = ({ editorConfig }) => ({ editorConfig });

export default compose(
  graphql(queries),
  connect(mapStateToProps, {
    saveCode,
    changeFontSize,
    changeTheme,
    changeLanguage
  })
)(Editor);
