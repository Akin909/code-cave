import React from 'react';
import * as actions from './index.js';

test('Action creators all return valid actions', () => {
  const expected = { type: 'SAVE_CODE', code: 'Test code' };
  it('should return an action with the correct payload', () => {
    expect(actions.saveCode('Test code').code).toBe('Test code');
  });
  it('should return an action with the correct payload', () => {
    expect(actions.saveCode('Test code').type).toBe('SAVE_CODE');
  });
});
