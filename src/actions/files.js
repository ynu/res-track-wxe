import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import { startUpload, endUpload } from './common';
import fetch from '../core/fetch';
import { REMOVE_IMAGE_FROM_UPLOADER } from '../constants';

export const upload = file => async dispatch => {
  dispatch(startUpload(file));
  try {
    // 上传图片到服务器
    const data = new FormData();
    data.append('file', file.nativeFile);
    const res = await fetch('/api/files', {
      credentials: 'same-origin',
      method: 'PUT',
      body: data,
    });
    const result = await res.json();
    dispatch(endUpload({ file, result }));
  } catch (e) {
    throw e;
  }
};

export const remove = serverId => dispatch => {
  dispatch({
    type: REMOVE_IMAGE_FROM_UPLOADER,
    serverId,
  });
  fetch(`/api/files/${serverId}`, {
    credentials: 'same-origin',
    method: 'DELETE',
  });
};
