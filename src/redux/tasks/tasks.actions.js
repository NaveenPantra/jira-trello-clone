import {ACTIONS} from "./tasks.constants";

const addTask = (payload) => {
    return {
        type: ACTIONS.ADD_TASK,
        payload,
    }
};

const deleteTask = (payload) => {
    return {
        type: ACTIONS.DELETE_TASK,
        payload,
    }
};

const editTask = (payload) => {
    return {
        type: ACTIONS.EDIT_TASK,
        payload,
    }
};

const updateTask = (payload) => {
    return {
        type: ACTIONS.UPDATE_TASK,
        payload,
    }
};

const toggleEditingText = (payload) => {
    return {
        type: ACTIONS.TOGGLE_EDITING_TASK,
        payload,
    }
};

export {
    addTask,
    deleteTask,
    editTask,
    updateTask,
    toggleEditingText
};
