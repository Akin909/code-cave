import Select from './Select';
import Options from './Options';
import React from 'react';

describe('Select component', () => {
  it('Should render a select', () => {
    const wrapper = shallow(<Select />);
    const optionsComponent = wrapper.find(Options);
    expect(optionsComponent.props().children).toEqual('');
  });
});
