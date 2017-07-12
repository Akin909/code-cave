import { Title, RoundButton, Button, Container, flex, Grid } from './Styled';
import AceEditor from 'react-ace';
import styled from 'styled-components';

export const SaveButton = Button.extend`
  font-size: 1.3em;
  margin: 0.5em;
  min-width: 7.5em;
  min-heigth: 3em;
  width: auto;
`;

export const MenuButton = RoundButton.extend`
  top:  1em;
  left: 1em;
  position: absolute;
`;

export const EditorContainer = Container.extend`
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflowX:scroll;
`;

export const EditorViews = styled.div`
  width: 100%;
  height: 100%;
  ${flex}
`;

export const CodeEditor = styled(AceEditor)`
  width: 80%;
  height: 100%;
  box-shadow: -1px 2px 0 rgba(0, 0, 0, 0.5);
  margin: 0.2em;
`;

export const NoCode = Title.extend`
  width: 100%;
  text-align: center;
  padding: 0.2em;
`;
