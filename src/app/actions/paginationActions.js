import {PAGINATION_TYPE} from 'constants/actionTypes';

export function pageIndex(page) {
  return dispatch => {
    dispatch({
      type: PAGINATION_TYPE,
      page: page,
    });
  }
}
