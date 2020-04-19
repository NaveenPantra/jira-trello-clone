import {ACTIONS} from "./taskList.constants";
import {LOCAL_STORAGE_KEYS} from "../../utils/constants";
import {checkAndAddAppDataToLS, getAppDataFromLS} from "../../utils/helpers";
import {insertTask, transferTask, insertNewTaskListAtOldTaskListPos, deleteTask, swapTasksList} from "./taskList.helpers";

const tasksListReducer = (state = {}, action = {}) => {
    const {type, payload} = action;
    let tasksList = Object.assign({}, state);
    switch (type) {
        case ACTIONS.ADD_TASK_LIST:
            {
                const {newTaskListName} = payload;
                tasksList[newTaskListName] = {
                    name: newTaskListName,
                    tasks: [],
                };
            }
            break;
        case ACTIONS.DELETE_TASK_LIST:
            const {taskListName} = payload;
            tasksList = Object.assign({}, tasksList);
            delete tasksList[taskListName];
            break;
        case ACTIONS.EDIT_TASK_LIST_NAME:
            {
                const {oldTaskListName, newTaskListName} = payload
                tasksList = insertNewTaskListAtOldTaskListPos(tasksList, oldTaskListName, newTaskListName)
            }
            break;
        case ACTIONS.ADD_TASK_ID:
            {
                const { tasksListName, newTaskID, index = 0 } = payload;
                tasksList[tasksListName].tasks = insertTask(tasksList[tasksListName].tasks, newTaskID, index);
            }
            break;
        case ACTIONS.DELETE_TASK_ID:
            {
                try {
                    const {index, tasksListName} = payload;
                    tasksList[tasksListName].tasks = deleteTask(tasksList[tasksListName].tasks, index);
                } catch(e){}
            }
            break;
        case ACTIONS.TRANSFER_TASK:
            {
                const {ID, from, to, currentIndex, originalIndex} = payload;
                let sourceTaskList = tasksList[from].tasks;
                let destinationTaskList = tasksList[to].tasks;
                [sourceTaskList, destinationTaskList] = transferTask(ID, from, to, currentIndex, originalIndex, sourceTaskList, destinationTaskList);
                tasksList[from].tasks = sourceTaskList;
                tasksList[to].tasks = destinationTaskList;
            }
            break;
        case ACTIONS.SWAP_TASKS_LIST:
            {
                const {task1, task2} = payload;
                tasksList = swapTasksList(tasksList, task1, task2);
            }
            break;
        default:
            checkAndAddAppDataToLS();
            const appData = getAppDataFromLS();
            tasksList = appData.tasksList;
            break;
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS_LIST, JSON.stringify(tasksList));
    return tasksList;
};


export {tasksListReducer};
