import { ACTIONS } from "./taskList.constants";

const addTaskList = (payload) => {
    return {
        type: ACTIONS.ADD_TASK_LIST,
        payload,
    };
};

const deleteTaskList = (payload) => {
    return {
        type: ACTIONS.DELETE_TASK_LIST,
        payload,
    };
};

const editTaskListName = (payload) => {
    return {
        type: ACTIONS.EDIT_TASK_LIST_NAME,
        payload,
    };
};

const addTaskID = (payload) => {
    return {
        type: ACTIONS.ADD_TASK_ID,
        payload,
    };
};

const deleteTaskID = (payload) => {
    return {
        type: ACTIONS.DELETE_TASK_ID,
        payload,
    };
};

const transferTask = (payload) => {
    return {
        type: ACTIONS.TRANSFER_TASK,
        payload,
    };
};

const swapTasksList = (payload) => {
    return {
        type: ACTIONS.SWAP_TASKS_LIST,
        payload,
    };
};

export {
    addTaskList,
    deleteTaskList,
    editTaskListName,
    addTaskID,
    deleteTaskID,
    transferTask,
    swapTasksList
};
