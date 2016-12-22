import { combineReducers } from 'redux';
import { START_UPLOAD, END_UPLOAD } from '../actions/common';
import { REMOVE_IMAGE_FROM_UPLOADER } from '../constants';

const files = (state = [], action) => {
  switch (action.type) {
    case START_UPLOAD:
      return [
        ...state,
        {
          url: action.data.data,
          status: '上传中',
        },
      ];
    case END_UPLOAD:
      return state.map(file => {
        if (file.url === action.data.file.data) {
          return {
            url: file.url,
            serverId: action.data.result.data,
          };
        }
        return file;
      });
    case REMOVE_IMAGE_FROM_UPLOADER:
      return state.filter(file => file.serverId !== action.serverId);
    default:
      return state;
  }
};

export default combineReducers({
  files,
});
