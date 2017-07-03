//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { saveCode } from './../actions/';

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: cream;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
`;

const CodeInput = styled.textarea`
  width: 40%;
  height: 40%;
`;

class Editor extends Component {
  render() {
    return (
      <EditorContainer>
        Editor
        <CodeInput />
      </EditorContainer>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { saveCode })(Editor);
