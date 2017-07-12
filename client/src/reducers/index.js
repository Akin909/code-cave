import c from './../constants';
import { combineReducers } from 'redux';

const initialConfig = {
  theme: 'tomorrow_night',
  language: 'javascript',
  fontSize: '14px',
  menuVisible: false,
  code: '',
  repl: ''
};

export function editorConfig(state: Object = initialConfig, action: Object) {
  switch (action.type) {
    case c.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      };
    case c.CHANGE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.fontSize
      };

    case c.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    case c.TOGGLE_MENU:
      return {
        ...state,
        menuVisible: !state.menuVisible
      };

    case c.SAVE_CODE:
      return {
        ...state,
        code: action.code
      };
    case c.SAVE_EVAL:
      return {
        ...state,
        repl: action.code
      };
    default:
      return state;
  }
}

export function user(state: Object = {}, action) {
  switch (action.type) {
    case c.SIGN_IN:
      return {
        ...state,
        signedIn: action.user
      };
    default:
      return state;
  }
}

export default combineReducers({
  editorConfig,
  user
});
