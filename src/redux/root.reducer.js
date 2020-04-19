import { combineReducers } from "redux";
import {tasksListReducer} from "./taksList/tasksList.reducer";
import {tasksReducer} from "./tasks/tasks.reducer";
import {draggingTaskReducer} from "./draggingTask/draggingTask.reducer";

export default combineReducers({
    tasksList: tasksListReducer,
    tasks: tasksReducer,
    draggingTask: draggingTaskReducer,
});
