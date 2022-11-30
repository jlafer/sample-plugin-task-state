import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import * as R from 'ramda';

import reducers, {namespace, initiateTaskState, terminateTaskState} from './states';

const PLUGIN_NAME = 'SampleExtendedTaskStatePlugin';

const afterAcceptTask = R.curry((manager, payload) => {
  const {store} = manager;
  const {dispatch} = store;
  const {task} = payload;
  const {taskChannelUniqueName, attributes, sourceObject} = task;
  const {channelSid} = attributes;
  dispatch( initiateTaskState(task.sid, channelSid, sourceObject.dateCreated.getTime()) );
});

const afterCompleteTask = R.curry((manager, payload) => {
  const {store} = manager;
  const {dispatch} = store;
  const {task} = payload;
  const {taskChannelUniqueName} = task;
  const state = store.getState()[namespace].appState;
  const {tasks} = state;
  const taskInState = tasks[task.sid];
  console.log(`will terminate task ${taskInState}`);
  dispatch( terminateTaskState(task.sid) );
});

export default class SampleExtendedTaskStatePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    console.log(`${PLUGIN_NAME}: initializing in Flex ${VERSION} instance`);
    const {store} = manager;
    store.addReducer(namespace, reducers);
    flex.Actions.addListener("afterAcceptTask", afterAcceptTask(manager));
    flex.Actions.addListener("afterCompleteTask", afterCompleteTask(manager));
  }
}
