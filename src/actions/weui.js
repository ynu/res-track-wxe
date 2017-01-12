export const SHOW_CONFIRM = 'SHOW_CONFIRM';

export const HIDE_CONFIRM = 'HIDE_CONFIRM';

export const showConfirm = data => ({
  type: SHOW_CONFIRM,
  data,
});

export const hideConfirm = () => ({
  type: HIDE_CONFIRM,
});

export const SHOW_GALLERY = 'SHOW_GALLERY';

export const showGallery = file => ({
  type: SHOW_GALLERY,
  file,
});
