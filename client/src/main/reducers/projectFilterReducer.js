import { UPDATE_FILTER } from '../actions/types';

const initialState = {
  teamSizeFilter: {},
  categoryFilter: [],
  technologyFilter: [],
};

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        [action.filterType]: action.data,
      };
    default:
      return state;
  }
}
