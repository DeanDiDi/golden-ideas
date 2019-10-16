import { combineReducers } from 'redux';
import projectListReducer from './projectListReducer';

export default combineReducers({
  projectList: projectListReducer,
});
