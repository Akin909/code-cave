import c from './../constants';
import { combineReducers } from 'redux';

const initialConfig = {
  theme: 'tomorrow_night',
  language: 'javascript'
};

export function editorConfig(state = initialConfig, action) {
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
      console.log('action', action);
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
}

export default combineReducers({
  editorConfig
});
