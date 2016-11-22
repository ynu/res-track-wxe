export const FETCH_FAILED = 'common/FETCH_FAILED';
export const FETCHING = 'common/FETCHING';
export const FETCH_DONE = 'common/FETCH_DONE';
export const RESET = 'common/RESET';

export const fetchFailed = error => ({
  type: FETCH_FAILED,
  error,
});

export const fetching = (data = null) => ({
  type: FETCHING,
  data: data || '',
});

export const fetchDone = data => ({
  type: FETCH_DONE,
  data: data || '',
});

export const reset = () => ({
  type: RESET,
});
export const clean = () => ({
  type: RESET,
});
