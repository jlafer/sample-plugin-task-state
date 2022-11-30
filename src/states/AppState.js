import * as R from 'ramda';
import {INITIATE_TASK_STATE, TERMINATE_TASK_STATE} from './actions';

const initialState = {
  tasks: {}
};

export default function reduce(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case INITIATE_TASK_STATE:
      return initTaskState(state, payload);
    case TERMINATE_TASK_STATE:
      return removeTaskState(state, payload);
    default:
      return state;
  }
}

export const initTaskState = (state, payload) => {
  const {resSid, channelSid, ts} = payload;
  const task = setExtendedTaskState(channelSid, ts);
  const tasks = R.assoc(resSid, task, state.tasks);
  console.log('---------------initTaskState: tasks now:', tasks);
  return {...state, tasks};
};

const setExtendedTaskState = (channelSid, startTS) => {
  return {
    channelSid, startTS, subject: ''
  };
};

export const removeTaskState = (state, payload) => {
  const {resSid} = payload;
  const task = state.tasks[resSid];
  if (!task) {
    console.warn('removeTaskState: task not found in state???', payload);
    return state;
  }
  const tasks = R.dissoc(resSid, state.tasks);
  console.log('---------------removeTaskState: tasks now:', tasks);
  return {...state, tasks};
};
