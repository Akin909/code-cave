//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import brace from 'brace';
import { Title, Grid } from './Styled';
import { split as SplitAceEditor } from 'react-ace';

import * as queries from './../queries/';
import {
  MenuButton,
  EditorContainer,
  EditorViews,
  CodeEditor,
  NoCode,
  SaveButton
} from './EditorStyles';

import * as actions from './../actions/';

import Options from './Options';
import CodeBlock from './CodeBlock';

const themes = [
  'monokai',
  'github',
  'tomorrow_night',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal'
];

const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css'
];

themes.forEach(theme => {
  require(`brace/theme/${theme}`);
});

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
  require(`brace/snippets/${lang}`);
});

class Editor extends Component {
  state = {
    repl: '',
    languages,
    themes
  };

  componentWillUnmount() {
    this.props.saveEvaluated();
  }

  generateProps = (propsObj: Object | void) => ({
    ...this.state,
    ...this.props,
    ...propsObj
  });

  handleMenuClick = (e: Event) => {
    this.props.toggleMenu();
  };

  handleChange = (codeAndRepl: Array<string>) => {
    const [code] = codeAndRepl;
    this.props.saveCode(code);
  };

  editCode = (code: string) => {
    this.props.saveCode(code);
  };

  evalCode = () => {
    const { saveEvaluated, editorConfig: { code } } = this.props;
    const evaluated = eval(code);
    //console.log('evaluated', evaluated);
    saveEvaluated(!evaluated ? 'undefined' : evaluated.toString());
  };

  saveCurrentCode = async () => {
    const {
      editorConfig: { code },
      saveCode,
      user: { signedIn },
      mutate,
      history
    } = this.props;
    saveCode(code);
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

  renderUserCode = signedIn =>
    signedIn.code
      ? signedIn.code.map(({ code, id }) => (
          <CodeBlock
            editCode={this.editCode}
            code={code}
            language="javascript"
            style="atomOneDark"
            key={id}
          />
        ))
      : <NoCode>No Saved Code</NoCode>;

  render() {
    const props = this.generateProps({ onClick: this.handleMenuClick });
    const {
      editorConfig: { theme, language, code, repl, fontSize },
      user: { signedIn },
      data: { users }
    } = this.props;
    return (
      <EditorContainer row>
        <Options {...props} />
        <Title>Editor</Title>
        <MenuButton {...props} />
        <EditorViews>
          <SplitAceEditor
            enableBasicAutoCompletion={true}
            width={'70%'}
            height={'35em'}
            value={[code, repl]}
            splits={2}
            fontSize={fontSize}
            orientation="beside"
            onChange={this.handleChange}
            mode={language}
            theme={theme}
            editorProps={{ $blockScrolling: true }}
          />
          <SaveButton onClick={this.saveCurrentCode}>
            {signedIn ? 'Save' : 'Sign in to Save'}
          </SaveButton>
          <SaveButton onClick={this.evalCode}>
            Run Code
          </SaveButton>
        </EditorViews>
        {signedIn && <Grid row>{this.renderUserCode(signedIn)}</Grid>}
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
  graphql(queries.addCodeMutation, {
    options: ({ user_id, code }: { user_id: string, code: string }) => ({
      variables: { user_id, code },
      refetchQueries: [
        {
          query: queries.usersQuery
        }
      ]
    })
  }),
  connect(mapStateToProps, { ...actions })
)(Editor);
