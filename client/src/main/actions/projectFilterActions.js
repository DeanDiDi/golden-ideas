import { UPDATE_FILTER, PROJECTS_LOADING, UPDATE_PROJECTS } from './types';

export const updateFilter = (filterType, data) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_FILTER,
    filterType,
    data,
  });
};

export const applyFilter = () => (dispatch, getState) => {
  const state = getState();
  const projectFilter = state.projectFilter;
  const projects = state.projectList.projects;
  const { teamSizeFilter, categoryFilter, technologyFilter } = projectFilter;

  dispatch({ type: PROJECTS_LOADING });

  const filteredProjects = projects.filter(
    project => {
      const { size, category: projectCategory, technology: projectTechnology } = project;
      const inSize = teamSizeFilter.minValue <= size && size <= teamSizeFilter.maxValue;
      const noCategory = Array.isArray(categoryFilter) && !categoryFilter.length;
      const inCategory = categoryFilter.every(category => projectCategory.includes(category));
      const noTechnology = Array.isArray(technologyFilter) && !technologyFilter.length;
      const inTechnology = technologyFilter.every(technology => projectTechnology.includes(technology));
      return inSize && (noCategory || inCategory) && (noTechnology || inTechnology);
    }
  );

  dispatch({
    type: UPDATE_PROJECTS,
    payload: filteredProjects,
  });
};
