import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';

const Code = styled(SyntaxHighlighter)`
  margin: 1em;
  padding: 0.5em;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: whitesmoke;
  width: 40%;
  height: 15em;
`;

const codeStyle = {
  atomOneDark
};

const CodeBlock = ({
  showLineNumbers,
  language,
  style,
  code
}: {
  showLineNumbers: Boolean,
  language: String,
  style: Object,
  code: String
}) => (
  <Code showLineNumbers language={language} style={codeStyle[style]}>
    {code}
  </Code>
);

export default CodeBlock;
