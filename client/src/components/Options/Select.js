import React from 'react';
import PropTypes from 'prop-types';

import { Select as StyledSelect, Option } from './../styled';

const Select = ({ array, handleChange, selected }) => (
  <StyledSelect
    onChange={({ target: { value } }) => handleChange(value)}
    defaultValue={selected}
  >
    {array.map((item, index) => (
      <Option value={item} key={index}>{item}</Option>
    ))}
  </StyledSelect>
);

Select.defaultProps = {
  array: [],
  editorConfig: { fontSize: '14px', theme: 'tomorrow_night' }
};

Select.propTypes = {
  array: PropTypes.array,
  editorConfig: PropTypes.object,
  handleChange: PropTypes.func
};

export default Select;
