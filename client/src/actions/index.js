import c from './../constants/';

export const saveCode = code => ({
  type: c.SAVE_CODE,
  code
});

export const changeFontSize = size => ({
  type: c.CHANGE_FONT_SIZE,
  fontSize
});

export const changeTheme = theme => ({
  type: c.CHANGE_THEME,
  theme
});

export const changeLanguage = language => ({
  type: c.CHANGE_LANGUAGE,
  language
});
