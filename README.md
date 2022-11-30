# Sample Twilio Flex Plugin for Task State

This is a sample Twilio Flex Plugin that demonstrates one way to manage Task state in the Redux store.

As tasks are accepted by the agent, selected task properties are added to a dictionary object in the store. When those tasks are completed by the agent, they are removed. The task properties to be stored in state are chosen by the developer.

# Usage

The `afterAcceptTask` handler saves the initial state of each new task, which is saved in a dictionary object keyed by the Task Reservation SID. Currently, this is done for all tasks but one could check task properties (e.g., the channel type) and be selective if state is only desired for certain tasks.

At any point in the lifecycle of a task, the developer can retrieve its current state by calling `states.getTask(state, resSid)` or update its state by calling `dispatch( updateTaskState(resSid, data) )`. Examples of these can be found in the code.

When a task is completed by the agent, the `afterCompleteTask` handler removes the task state from the store.
