import * as R from 'ramda';
import {INITIATE_TASK_STATE, UPDATE_SELECTED_TASK, UPDATE_TASK_STATE, TERMINATE_TASK_STATE} from './actions';

const initialState = {
  tasks: {},
  selectedTask: null
};

export default function reduce(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case INITIATE_TASK_STATE:
      return initTaskState(state, payload);
    case UPDATE_SELECTED_TASK:
      return updateSelectedTask(state, payload);
    case UPDATE_TASK_STATE:
      return updateTaskState(state, payload);
    case TERMINATE_TASK_STATE:
      return removeTaskState(state, payload);
    default:
      return state;
  }
}

export const initTaskState = (state, payload) => {
  const {resSid, data} = payload;
  const tasks = R.assoc(resSid, data, state.tasks);
  return {...state, tasks, selectedTask: resSid};
};

export const updateSelectedTask = (state, payload) => {
  const {resSid} = payload;
  const task = getTask(state, resSid);
  if (!task) {
    return state;
  }
  const newState = {...state, selectedTask: resSid};
  return newState;
};

export const updateTaskState = (state, payload) => {
  const {resSid, data} = payload;
  const task = getTask(state, resSid);
  if (!task) {
    return state;
  }
  const updatedTask = R.mergeRight(task, data);
  const tasks = R.assoc(resSid, updatedTask, state.tasks);
  return {...state, tasks};
};

export const removeTaskState = (state, payload) => {
  const {resSid} = payload;
  const task = getTask(state, resSid);
  if (!task) {
    return state;
  }
  const tasks = R.dissoc(resSid, state.tasks);
  return {...state, tasks, selectedTask: null};
};

export const getSelectedTask = (state) => {
  const resSid = state.selectedTask;
  if (!resSid) {
    console.warn(`getSelectedTask: no task has been selected???`);
  }
  const task = getTask(state, resSid);
  if (!task) {
    console.warn(`getSelectedTask: selected task (${resSid}) not found in state???`);
  }
  return task;
}

export const getTask = (state, resSid) => {
  const task = state.tasks[resSid];
  if (!task) {
    console.warn(`getTask: task not found in state for ${resSid}???`);
  }
  return task;
}