import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import * as R from 'ramda';

import reducers, {namespace, initiateTaskState, updateTaskState, terminateTaskState, getTask} from './states';

const PLUGIN_NAME = 'SampleExtendedTaskStatePlugin';

const afterAcceptTask = R.curry((manager, payload) => {
  const {store} = manager;
  const {dispatch} = store;
  const {task} = payload;
  const {taskChannelUniqueName, attributes, sourceObject} = task;
  const {channelSid} = attributes;
  dispatch( initiateTaskState(task.sid, {count: 0, channelSid}) );
});

const afterSelectTask = R.curry((manager, payload) => {
  const {store} = manager;
  const {dispatch} = store;
  const {task} = payload;
  if (!task)
    return;
  const taskInState = getTaskFromState(store, task.sid);
  if (taskInState) {
    dispatch( updateTaskState(task.sid, {count: taskInState.count + 1}) );
    alert(`Task has been selected ${taskInState.count + 1} times`);
  }
});

const afterCompleteTask = R.curry((manager, payload) => {
  const {store} = manager;
  const {dispatch} = store;
  const {task} = payload;
  const taskInState = getTaskFromState(store, task.sid);
  console.log(`will terminate task:`, taskInState);
  dispatch( terminateTaskState(task.sid) );
});

const getTaskFromState = (store, resSid) => {
  const state = store.getState()[namespace].appState;
  const task = getTask(state, resSid);
  return task;
};

export default class SampleExtendedTaskStatePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    console.log(`${PLUGIN_NAME}: initializing in Flex ${VERSION} instance`);
    const {store} = manager;
    store.addReducer(namespace, reducers);
    flex.Actions.addListener("afterAcceptTask", afterAcceptTask(manager));
    flex.Actions.addListener("afterSelectTask", afterSelectTask(manager));
    flex.Actions.addListener("afterCompleteTask", afterCompleteTask(manager));
  }
}
