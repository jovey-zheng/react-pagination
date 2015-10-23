import {PAGINATION_TYPE} from 'constants/actionTypes';

const initialState = {
  page: 0,
}
export default function pagination(state = initialState, action) {
  if (action.type === PAGINATION_TYPE) {
    return {
      ...state,
      page: action.page,
    };
  }
  return state;
}
