import { combineReducers } from 'redux';
import projectListReducer from './main/reducers/projectListReducer';
import projectFilterReducer from './main/reducers/projectFilterReducer';

export default combineReducers({
  projectList: projectListReducer,
  projectFilter: projectFilterReducer,
});
