import {LOCAL_STORAGE_KEYS} from "./constants";
import {INITIAL_TASKS_LIST, INITIAL_TASKS} from './../redux/initial.state';

const checkAndAddAppDataToLS = () => {
    try {
        let tasksList = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS_LIST);
        let tasks = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS);
        if (tasksList && tasks) {
            JSON.stringify(tasksList);
            JSON.stringify(tasks);
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS_LIST, JSON.stringify(INITIAL_TASKS_LIST));
            localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
        }
    } catch (e) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.TASKS_LIST);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.TASKS);
        checkAndAddAppDataToLS();
    }
};

const getAppDataFromLS = () => {
    try {
        let tasksList = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS_LIST);
        let tasks = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS);
        if (tasksList && tasks) {
            tasksList = JSON.parse(tasksList);
            tasks = JSON.parse(tasks);
            return {
                tasksList,
                tasks,
            };
        }
        throw new Error("data not found");
    } catch (e) {
        checkAndAddAppDataToLS();
        return {
            tasksList: INITIAL_TASKS_LIST,
            tasks: INITIAL_TASKS,
        }
    }
};

function generateRandomString(len = 20) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const charsLength = chars.length;
    let randomString = "";
    let char = '';
    while (len >= 0) {
        char = chars.charAt(Math.floor(Math.random() * charsLength));
        randomString += char;
        len--;
    }
    return randomString;
}

function clearPreviousDraggingElements() {
    try {
        const prevDraggingClones = [...document.querySelectorAll(".draggingClone")];
        prevDraggingClones.forEach(ele => ele.remove());
    } catch (e) {}
}
function clearClassesForElements(selectingSelector, removingStr) {
    try {
        const elements = [...document.querySelectorAll(selectingSelector)];
        elements.forEach(ele => ele.classList.remove(removingStr));
    } catch (e) {}
}

export {
    checkAndAddAppDataToLS,
    getAppDataFromLS,
    generateRandomString,
    clearPreviousDraggingElements,
    clearClassesForElements
}
