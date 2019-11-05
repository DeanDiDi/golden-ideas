import { GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, PROJECTS_LOADING, UPDATE_FILTER } from '../actions/types';

const initialState = {
  projects: [],
  loading: false,
  filteredProjects: [],
  filters: {
    teamSizeFilter: {},
    categoryFilter: [],
    technologyFilter: [],
  },
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload),
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filters:{
          ...state.filters,
          [action.filterType]: action.data,
        },
      };
    default:
      return state;
  }
}
