//@flow
import c from './../constants/';

export const saveCode = (code: string) => ({
  type: c.SAVE_CODE,
  code
});
export const saveEvaluated = (code: string) => ({
  type: c.SAVE_EVAL,
  code
});

export const changeFontSize = (fontSize: string) => ({
  type: c.CHANGE_FONT_SIZE,
  fontSize
});

export const changeTheme = (theme: string) => ({
  type: c.CHANGE_THEME,
  theme
});

export const changeLanguage = (language: string) => ({
  type: c.CHANGE_LANGUAGE,
  language
});

export const signIn = (user: Object) => ({
  type: c.SIGN_IN,
  user
});

export const toggleMenu = () => ({
  type: c.TOGGLE_MENU
});

export const logout = () => ({
  type: c.LOG_OUT
});
