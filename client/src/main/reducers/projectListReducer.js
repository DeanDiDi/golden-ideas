import { GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, PROJECTS_LOADING, UPDATE_PROJECTS } from '../actions/types';

const initialState = {
  projects: [],
  filteredProjects: [],
  loading: false,
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
    case UPDATE_PROJECTS:
      return {
        ...state,
        filteredProjects: action.payload,
        loading:false,
      }
    default:
      return state;
  }
}
