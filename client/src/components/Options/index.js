import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from './../styled';

const MenuButton = styled(Button)`
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

const Options = ({ fontSize, theme, visible, handleMenuClick }) => {
  return (
    <OptionsDrawer visible={visible}>
      <MenuTitle>Options</MenuTitle>
    </OptionsDrawer>
  );
};

Options.defaultProps = {
  fontSize: '14',
  theme: 'tomorrow_night',
  visible: false
};

Options.propTypes = {
  fontSize: PropTypes.string,
  theme: PropTypes.string,
  handleMenuClick: PropTypes.func,
  visible: PropTypes.bool
};

export default Options;
