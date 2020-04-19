import {ACTIONS} from "./tasks.constants";
import {LOCAL_STORAGE_KEYS} from "../../utils/constants";
import {checkAndAddAppDataToLS, getAppDataFromLS} from "../../utils/helpers";

const tasksReducer = (state = {}, action = {}) => {
    const {type, payload} = action;
    let tasks = Object.assign({}, state);
    switch (type) {
        case ACTIONS.ADD_TASK:
            const {ID, taskText, isEditing} = payload;
            tasks[ID] = {
                ID,
                taskText,
                isEditing: isEditing,
            };
            break;
        case ACTIONS.DELETE_TASK:
            {
                const {ID} = payload;
                delete tasks[ID];
            }
            break;
        case ACTIONS.UPDATE_TASK:
            const {editTaskText, editTaskID} = payload;
            tasks[editTaskID].taskText = editTaskText;
            break;
        case ACTIONS.TOGGLE_EDITING_TASK:
            const {taskID} = payload;
            tasks[taskID].isEditing = !tasks[taskID].isEditing;
            break;
        default:
            checkAndAddAppDataToLS();
            const appData = getAppDataFromLS();
            tasks = appData.tasks;
            break;
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    return tasks;
};

export {tasksReducer};
