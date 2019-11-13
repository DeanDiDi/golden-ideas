import { createSelector } from 'reselect'

const getProjectList = state => state.projectList;
const getFilters = state => getProjectList(state) && state.projectList.filters;
const getProjects = state =>  getProjectList(state) && state.projectList.projects;

export const getFilteredProjects = createSelector(
  [getProjects, getFilters],
  (projects, filters) => {
    const { teamSizeFilter, categoryFilter, technologyFilter } = filters;
    const filteredProjects = projects.filter(
      project => {
        const { size, category: projectCategory, technology: projectTechnology } = project;
        const noSize = Object.keys(teamSizeFilter).length === 0 && teamSizeFilter.constructor === Object;
        const inSize = teamSizeFilter.minValue <= size && size <= teamSizeFilter.maxValue;
        const noCategory = Array.isArray(categoryFilter) && !categoryFilter.length;
        const inCategory = categoryFilter.every(category => projectCategory.includes(category));
        const noTechnology = Array.isArray(technologyFilter) && !technologyFilter.length;
        const inTechnology = technologyFilter.every(technology => projectTechnology.includes(technology));
        return (noSize || inSize) && (noCategory || inCategory) && (noTechnology || inTechnology);
      }
    );
    return filteredProjects;
  }
);
