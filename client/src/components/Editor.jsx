//@flow
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/theme/tomorrow_night';
import 'brace/mode/javascript';

import queries from './../queries/';
import { Title, Button } from './styled';
import { saveCode } from './../actions/';

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
    visible: false
  };

  handleMenuClick = e => {
    this.setState({ visible: !this.state.visible });
  };

  handleChange = code => {
    //console.log('code', code);
    this.setState({ code });
    this.props.saveCode(code);
  };

  render() {
    //console.log('this.props', this.props);
    const { code, visible } = this.state;
    return (
      <EditorContainer>
        <Options handleMenuClick={this.handleMenuClick} visible={visible} />
        <Title>Editor</Title>
        <MenuButton visible={visible} onClick={this.handleMenuClick} />
        <CodeEditor
          enableBasicAutoCompletion={true}
          width={'50%'}
          height={'80%'}
          value={code}
          onChange={this.handleChange}
          mode="javascript"
          theme="tomorrow_night"
        />
      </EditorContainer>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default compose(
  graphql(queries),
  connect(mapStateToProps, { saveCode })
)(Editor);
