//@flow
import React from 'react';

import { capitaliseAndSpace } from './../lib/utils';
import { Select as StyledSelect, Option } from './Styled';

const Select = ({
  array,
  handleChange,
  selected
}: {
  array: Array<any>,
  handleChange: (event: Event) => void,
  selected: string
}) => (
  <StyledSelect
    onChange={({ target: { value } }) => handleChange(value)}
    defaultValue={selected}
  >
    {array.map((item, index) => (
      <Option value={item} key={index}>{capitaliseAndSpace(item)}</Option>
    ))}
  </StyledSelect>
);

Select.defaultProps = {
  array: []
};

export default Select;
