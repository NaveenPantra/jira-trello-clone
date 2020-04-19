function insertTask(arr, ele, index = 0) {
    if (index === -1) {
        arr.push(ele);
        return arr;
    }
    let temp = [...arr];
    arr = arr.slice(0, index);
    arr.push(ele);
    arr.push(...temp.slice(index));
    return arr;
}

function deleteTask(arr, index) {
    arr = [...arr.slice(0, index), ...arr.slice(index + 1)];
    return arr;

}

function transferTask(ID, from, to, currentIndex, originalIndex, sourceTaskList, destinationTaskList) {
    sourceTaskList = deleteTask(sourceTaskList, originalIndex);
    if (from === to) destinationTaskList = sourceTaskList;
    destinationTaskList = insertTask(destinationTaskList, ID, currentIndex);
    return [sourceTaskList, destinationTaskList];
}

function insertNewTaskListAtOldTaskListPos(tasksList, oldTaskListName, newTaskListName) {
    const newTasksList = {};
    Object.keys(tasksList).forEach(taskListName => {
        if (taskListName.toLowerCase() === oldTaskListName.toLowerCase()) {
            newTasksList[newTaskListName] = {
                name: [newTaskListName],
                tasks: tasksList[taskListName].tasks,
            };
        } else {
            newTasksList[taskListName] = {
                name: [taskListName],
                tasks: tasksList[taskListName].tasks,
            };
        }
    });
    return newTasksList;
}

function swapTasksList(tasksList, task1, task2) {
    let keys = Object.keys(tasksList);
    keys = keys.map(key => {
        if (key === task1) return task2;
        if (key === task2) return task1;
        return key;
    });
    const newTasksList = {};
    keys.forEach(key => {
        newTasksList[key] = tasksList[key];
    });
    return newTasksList;
}

export {insertTask, transferTask, deleteTask, insertNewTaskListAtOldTaskListPos, swapTasksList};
