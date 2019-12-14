import axios from 'axios';
import crypto from 'crypto';
import { GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, PROJECTS_LOADING, UPDATE_FILTER } from './types';
import { sendEmail } from '../../common/emailer';

export const getProjects = () => dispatch => {
  dispatch(setProjectsLoading());
  axios.get('/api/projects')
    .then((response) => {
      dispatch({
        type: GET_PROJECTS,
        payload: response.data,
        loading: false,
      });
    });
};

export const addProject = data => dispatch => {
  let project = {
    // TODO: Remove hardcoded owner
    owner: '5d8174455b5acf228785ae79',
    name: data.projectName,
    size: data.teamSize,
    startDate: data.startDate,
    endDate: data.endDate,
    category: data.projectCategory,
    technology: data.projectTechnology,
    email: data.projectEmail,
    github: data.projectGithub,
    description: data.projectDesc,
  };
  const secret = crypto.createHash('sha256').update(JSON.stringify(project)).digest('hex');
  project.secret = secret;
  axios.post('/api/projects', project)
  .then((response) => {
    const newProject = response.data;
    dispatch({
      type: ADD_PROJECT,
      payload: newProject,
    });
    const text = `Your project '${newProject.name}':\n\t
      team size: ${newProject.size}\n\t
      project email: ${newProject.email}\n\t
      link: http://localhost:3000/${newProject.secret}`;
    sendEmail({
      to: response.data.email,
      text,
    });
  })
  .catch((error) => {
    console.log('error when adding new project\n', error.response);
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

export const updateFilter = (filterType, data) => dispatch => {
  dispatch({
    type: UPDATE_FILTER,
    filterType,
    data,
  });
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};
