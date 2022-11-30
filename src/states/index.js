import { combineReducers } from 'redux';

import {INITIATE_TASK_STATE, UPDATE_TASK_STATE, TERMINATE_TASK_STATE} from './actions';
import appStateReducer, {getTask} from './AppState';

// Register your redux store under a unique namespace
const namespace = 'sample-extended-task-state';

// Combine the reducers
export default combineReducers({
  appState: appStateReducer
});

const initiateTaskState = (resSid, data) => ({
  type: INITIATE_TASK_STATE, payload: {resSid, data}
});

const updateTaskState = (resSid, data) => ({
  type: UPDATE_TASK_STATE, payload: {resSid, data}
});

const terminateTaskState = (resSid) => ({
  type: TERMINATE_TASK_STATE, payload: {resSid}
});

export {
  namespace,
  initiateTaskState,
  updateTaskState,
  terminateTaskState,
  getTask
};
