import {ACTIONS} from "./draggingTask.constants";

const setCurrentDraggingTaskData = (payload) => {
    return {
        type: ACTIONS.SET_CURRENT_DRAGGING_TASK_DATA,
        payload,
    };
};

const deleteCurrentDraggingTaskData = (payload) => {
    return {
        type: ACTIONS.DELETE_CURRENT_DRAGGING_TASK_DATA,
        payload,
    };
};

const updateToOfCurrentDraggingTask = (payload) => {
    return {
        type: ACTIONS.UPDATE_TO_OF_CURRENT_DRAGGING_TASK,
        payload,
    };
};

const updateIndexOfCurrentDraggingTask = (payload) => {
    return {
        type: ACTIONS.UPDATE_INDEX_OF_CURRENT_DRAGGING_TASK,
        payload,
    };
};

const setCurrentDropTargetList = (payload) => {
    return {
        type: ACTIONS.SET_CURRENT_DROP_TARGET_LIST,
        payload,
    };
};

export {
    setCurrentDraggingTaskData,
    deleteCurrentDraggingTaskData,
    updateToOfCurrentDraggingTask,
    updateIndexOfCurrentDraggingTask,
    setCurrentDropTargetList,
};
