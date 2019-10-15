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

export const addProject = project => dispatch => {
  axios.post('/api/projects', {
    // TODO: Remove hardcoded owner
    owner: '5d8174455b5acf228785ae79',
    name: project.projectName,
    description: project.projectDesc,
  })
  .then((response) =>
    dispatch({
      type: ADD_PROJECT,
      payload: response.data,
    })
  )
  .catch((error) => {
    console.log('error', error.response);
  });
};

export const deleteProject = projectId => dispatch => {
  axios.delete(`/api/projects/${projectId}`)
    .then((response) =>
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      })
    )
    .catch((error) => {
      console.log('error', error.response);
    });
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};
