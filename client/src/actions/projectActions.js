import axios from 'axios';

export const GET_PROJECTS = 'GET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const PROJECTS_LOADING = 'PROJECTS_LOADING';

export const getProjects = () => dispatch => {
  dispatch(setProjectsLoading());
  axios.get('/api/projects')
    .then((response) =>
      dispatch({
        type: GET_PROJECTS,
        payload: response.data,
      })
    );
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};
