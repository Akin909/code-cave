import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionsDrawer = styled.div`
  width: 10%;
  height: 100%;
  background-color: grey;
`;

const Options = ({ fontSize, theme }) => (
  <OptionsDrawer>
    Options
  </OptionsDrawer>
);

Options.defaultProps = {
  fontSize: '14',
  theme: 'tomorrow_night'
};

Options.propTypes = {
  fontSize: PropTypes.string,
  theme: PropTypes.string
};

export default Options;
