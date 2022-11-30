import { combineReducers } from 'redux';

import {INITIATE_TASK_STATE, TERMINATE_TASK_STATE} from './actions';
import appStateReducer from './AppState';

// Register your redux store under a unique namespace
export const namespace = 'sample-extended-task-state';

// Combine the reducers
export default combineReducers({
  appState: appStateReducer
});

export const initiateTaskState = (resSid, channelSid, ts) => ({
  type: INITIATE_TASK_STATE, payload: {resSid, channelSid, ts}
});

export const terminateTaskState = (resSid) => ({
  type: TERMINATE_TASK_STATE, payload: {resSid}
});

