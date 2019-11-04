import { UPDATE_FILTER } from './types';

export const updateFilter = (filterType, data) => dispatch => {
  dispatch({
    type: UPDATE_FILTER,
    filterType,
    data,
  });
};
