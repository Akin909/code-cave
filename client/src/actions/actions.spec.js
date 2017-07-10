import React from 'react';
import * as actions from './index.js';

test('save code action should return the right action', () => {
  const expected = { type: 'SAVE_CODE', code: 'Test code' };
  it('should return an action with the correct payload', () => {
    expect(actions.saveCode('Test code').code).toBe('Test code');
  });
  it('should return an action with the correct payload', () => {
    expect(actions.saveCode('Test code').type).toBe('SAVE_CODE');
  });
});

test('change font action creator returns the correct action', () => {
  const actual = actions.changeFontSize('15px');
  expect(actual.type).toBe('CHANGE_FONT_SIZE');
  expect(actual.fontSize).toBe('15px');
});

test('change theme action creator returns the correct action', () => {
  const actual = actions.changeTheme('test_theme');
  expect(actual.type).toBe('CHANGE_THEME');
  expect(actual.theme).toBe('test_theme');
});

test('change language action creator returns the correct action', () => {
  const actual = actions.changeLanguage('Language');
  expect(actual.type).toBe('CHANGE_LANGUAGE');
  expect(actual.language).toBe('Language');
});

test('sign in user action creator returns the correct action', () => {
  const actual = actions.signIn({ username: 'johnny', email: 'test@test.com' });
  expect(actual.type).toBe('SIGN_IN');
  expect(actual.user.username).toBe('johnny');
});

test('toggle menu action should return the correct action', () => {
  const actual = actions.toggleMenu();
  expect(actual.type).toBe('TOGGLE_MENU');
});
