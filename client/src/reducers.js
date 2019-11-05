import { combineReducers } from 'redux';
import projectListReducer from './main/reducers/projectListReducer';

export default combineReducers({
  projectList: projectListReducer,
});
