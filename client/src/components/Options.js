//@flow
import React from 'react';
import styled from 'styled-components';

import { RoundButton, Input, Form, Label } from './Styled';
import Select from './Select';

const MenuButton = RoundButton.extend`
  top:  2em;
  left: 3em;
  position: absolute;
`;

const OptionsDrawer = styled.div`
  display:flex;
  flex-direction: column;
  position: absolute;
  align-items: space-around;
  padding: 8px;
  left: 0;
  top: 0;
  width: 20vw;
  height: 100vh;
  background-color: grey;
  transition: all 0.5s ease-in;
  transform: ${props => (props.visible ? 'translateX(0%)' : 'translateX(-100%)')};
`;

const MenuTitle = styled.h2`
  text-align: center;
  width: 100%;
  height: 2em;
  color: white;
`;

const Options = ({
  editorConfig,
  themes,
  languages,
  visible,
  handleMenuClick,
  changeFontSize,
  changeTheme,
  changeLanguage
}: {
  editorConfig: Object,
  themes: Array<string>,
  languages: Array<string>,
  visible: boolean,
  handleMenuClick: (event: Event) => void,
  changeFontSize: (fontSize: string) => Object,
  changeTheme: (theme: string) => Object,
  changeLanguage: (language: string) => Object
}) => {
  const { fontSize, theme, language } = editorConfig;
  return (
    <OptionsDrawer visible={visible}>
      <MenuTitle>Options</MenuTitle>
      <Form>
        <Label>
          Font Size:
          <Input placeholder="Font size" onChange={changeFontSize} />
        </Label>
        <Label>
          Language:
          <Select
            array={languages}
            handleChange={changeLanguage}
            selected={language}
          />
        </Label>
        <Label>
          Theme
          <Select array={themes} selected={theme} handleChange={changeTheme} />
        </Label>
      </Form>
    </OptionsDrawer>
  );
};

Options.defaultProps = {
  fontSize: '14',
  theme: 'tomorrow_night',
  visible: false,
  languages: [],
  themes: []
};

export default Options;
