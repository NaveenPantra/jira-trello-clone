import React, {useState, useRef} from 'react';
import { connect } from "react-redux";
import withStyles from "react-jss";
import Task from "../task/Task";
import AddTask from "./AddTask";
import {
    updateIndexOfCurrentDraggingTask,
    updateToOfCurrentDraggingTask,
} from "../../redux/draggingTask/draggingTask.actions";
import {transferTask, editTaskListName, deleteTaskList, swapTasksList} from "../../redux/taksList/taskList.actions";
import {deleteTask} from "../../redux/tasks/tasks.actions";
import Modal from "../commons/Modal";
import SimpleModalForm from "../commons/SimpleModalForm";
import {clearPreviousDraggingElements, clearClassesForElements} from "../../utils/helpers";
import {CLASS_NAMES} from "../../utils/constants";

const styles = {
    root: {
        width: "34rem",
        display: "inline-block",
        margin: "1.5rem",
        boxShadow: "var(--shadow-light)",
        borderRadius: 4,
        background: "white",
        position: "relative",
        overflow: "hidden",
        transition: "all .3s",
        maxWidth: "100%",

        "&:hover": {
            "& .taskListOptions": {
                transform: "translateY(0%)",
            },
            "& .optionsList": {
                transform: "translate(0, 0)",
            },
            "& span": {
                transform: "translateX(-8.5rem)",
            },
            "& .shortSpan": {
                transform: "translateX(-4.8rem)",
            }
        },
        "& span": {
            transition: "transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
        },
    },
    heading: {
        fontSize: "1.7rem",
        padding: "1rem 1rem 1.5rem",
        letterSpacing: .5,
        fontWeight: 600,
        borderBottom: "var(--line)",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "var(--shadow-light)",
        position: "relative",
    },
    list: {
        width: "100%",
        height: "70vh",
        overflowX: "hidden",
        overflowY: "scroll",
    },
    addTask: {
        display: "flex",
        fontSize: "4rem",
        position: "absolute",
        bottom: "2%",
        right: "5%",
        transition: "all .3s",
        cursor: "pointer",
        background: "var(--color-grey-light-1)",
        borderRadius: "50%",

        "&:hover": {
            boxShadow: "var(--shadow-light)"
        }
    },
    icon: {
        background: "var(--color-grey-light-1)",
        borderRadius: "50%"
    },
    taskListOptions: {
        position: "absolute",
        bottom: "2%",
        left: "4%",
        display: "flex",
        fontSize: "2rem",
        padding: "1rem",
        borderRadius: "50%",
        boxShadow: "var(--shadow-light)",
        background: "var(--color-grey-light-1)",
        cursor: "pointer",
        transform: "translateY(120%)",
        transition: "transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)",

        "&:last-child": {
            left: "20%",
        },

        "&:hover": {
            boxShadow: "var(--shadow-dark)",
        }
    },
    optionsList: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        right: 0,
        boxShadow: "var(--shadow-light)",
        background: "white",
        transform: "translate(0, -120%)",
        transition: "transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    },
    navIconWrapper: {
        cursor: "pointer",
        padding: "1rem",
        display: "flex",
        transition: "all .3s",

        "&:first-child": {
            marginRight: "1rem",
        },

        "&:hover": {
            boxShadow: "var(--shadow-dark)",
        },
    },
};

const TasksList = ({tasksListName, tasks, draggingTask, updateToOfCurrentDraggingTask, updateIndexOfCurrentDraggingTask, transferTask, tasksListNames, editTaskListName, deleteTaskList, deleteTask, swapTasksList, classes}) => {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteEditTaskListName, setDeleteEditTaskListName] = useState("");
    const [editTaskListHelper, setEditTaskListHelper] = useState("Type new name to edit.");
    const itemRef = useRef();
    function handleOnDragOver(event) {
        event.preventDefault();
        if (Object.keys(draggingTask).length === 0) return 0;
        if (draggingTask.to === tasksListName) return 0;
        updateToOfCurrentDraggingTask({to: tasksListName});
        updateIndexOfCurrentDraggingTask({index: -1});
    }
    function handleOnDrop(event) {
        event.preventDefault();
        if (Object.keys(draggingTask).length === 0) return 0;
        clearPreviousDraggingElements();
        clearClassesForElements(".dragOverClass", "dragOverClass");
        const {ID, from, to, currentIndex, originalIndex} = draggingTask;
        transferTask({ID, from, to, currentIndex, originalIndex});
    }
    function deleteTaskListName() {
        if (deleteEditTaskListName !== tasksListName) return 0;
        itemRef.current.style.maxWidth = 0;
        setTimeout(() => {
            deleteTaskList({taskListName: tasksListName});
            tasks.forEach(ID => {
                deleteTask({ID});
            });
            setDeleteEditTaskListName("");
            setIsDeleteModalOpen(false);
        }, 310);
    }
    function editTaskList() {
        if (setDeleteEditTaskListName.length === 0) {
           setEditTaskListHelper("Enter Valid Name");
           return 0;
        }
        const isTaskListExist = tasksListNames.some(taskListName => taskListName.toLowerCase() === deleteEditTaskListName);
        if (isTaskListExist) {
            setEditTaskListHelper(`Task List with ${deleteEditTaskListName} already exists.`);
            return 0;
        }
        editTaskListName({
            oldTaskListName: tasksListName,
            newTaskListName: deleteEditTaskListName,
        });
        setIsEditModalOpen(false);
        setEditTaskListHelper("");
        setDeleteEditTaskListName("");
    }
    function handleClickOnFroward() {
        const currentElement = itemRef.current;
        const nextElement = itemRef.current.nextElementSibling;
        currentElement.classList.add(CLASS_NAMES.SWAP_LIST_RIGHT);
        nextElement.classList.add(CLASS_NAMES.SWAP_LIST_LEFT);
        const currentTaskIndex = tasksListNames.indexOf(tasksListName);
        setTimeout(() => {
            swapTasksList({
                task1: tasksListNames[currentTaskIndex],
                task2: tasksListNames[currentTaskIndex + 1],
            });
            currentElement.classList.remove(CLASS_NAMES.SWAP_LIST_RIGHT);
            nextElement.classList.remove(CLASS_NAMES.SWAP_LIST_LEFT);
        }, 610);
    }
    function handleClickOnBackward() {
        const currentElement = itemRef.current;
        const prevElement = itemRef.current.previousElementSibling;
        currentElement.classList.add(CLASS_NAMES.SWAP_LIST_LEFT);
        prevElement.classList.add(CLASS_NAMES.SWAP_LIST_RIGHT);
        const currentTaskIndex = tasksListNames.indexOf(tasksListName);
        setTimeout(() => {
            swapTasksList({
                task1: tasksListNames[currentTaskIndex],
                task2: tasksListNames[currentTaskIndex - 1],
            });
            currentElement.classList.remove(CLASS_NAMES.SWAP_LIST_LEFT);
            prevElement.classList.remove(CLASS_NAMES.SWAP_LIST_RIGHT);
        }, 610);

    }
    const isNotFirstElement = tasksListNames.indexOf(tasksListName) > 0;
    const isNotLastElement = tasksListNames.indexOf(tasksListName) < tasksListNames.length - 1;
    return (
        <>
            <div
                ref={itemRef}
                className={classes.root}
                onDragOver={handleOnDragOver}
                onDrop={handleOnDrop}>
                <h3 title={tasksListName} className={classes.heading}>
                    {tasksListName}
                    <ul className={`${classes.optionsList} optionsList`}>
                        {
                            isNotFirstElement ?
                                (<li onClick={handleClickOnBackward} className={classes.navIconWrapper}><ion-icon name="chevron-back-outline" /></li>)
                                :
                                null
                        }
                        {
                            isNotLastElement ?
                                (<li onClick={handleClickOnFroward} className={classes.navIconWrapper}><ion-icon name="chevron-forward-outline" /></li>)
                                :
                                null
                        }
                    </ul>
                    <span className={!isNotFirstElement || !isNotLastElement ? "shortSpan" : ""}>{tasks.length}</span>
                </h3>
                <ul className={classes.list}>
                    {
                        tasks.map((task, ind) => <Task
                            key={task}
                            ID={task}
                            tasksListName={tasksListName}
                            index={ind} />)
                    }
                </ul>
                {
                    !isAddTaskOpen ?
                        (
                            <div className={classes.addTask} onClick={() => setIsAddTaskOpen(true)}>
                                <ion-icon className={classes.icon} name="add-circle-outline" />
                            </div>
                        )
                        :
                        null
                }
                <AddTask
                    tasksListName={tasksListName}
                    open={isAddTaskOpen}
                    onClose={() => setIsAddTaskOpen(false)}/>
                <div
                    className={`${classes.taskListOptions} taskListOptions`}
                    onClick={() => {
                        setDeleteEditTaskListName("");
                        setIsDeleteModalOpen(true);
                    }}>
                    <ion-icon name="trash-outline" />
                </div>
                <div
                    className={`${classes.taskListOptions} taskListOptions`}
                     onClick={() => {
                         setDeleteEditTaskListName(tasksListName);
                         setIsEditModalOpen(true);
                     }}>
                    <ion-icon name="create-outline" />
                </div>
            </div>
            <Modal open={isDeleteModalOpen} onClose={() => {setIsDeleteModalOpen(false)}}>
                <SimpleModalForm
                    headerText={<span>Delete <b style={{color: "#e74c3c"}}>{tasksListName}</b>?</span>}
                    submitText={"Delete List"}
                    discardText={"Cancel"}
                    setOpenModal={setIsDeleteModalOpen}
                    setNewTaskListName={setDeleteEditTaskListName}
                    taskErrorText={<span>Type <b style={{color: "#e74c3c"}}>{tasksListName}</b> to delete. <b style={{color: "#e74c3c"}}>{tasks.length}</b> task{tasks.length === 1 ? "" : "s"} will be deleted</span>}
                    newTaskListName={deleteEditTaskListName}
                    submit={deleteTaskListName}/>
            </Modal>
            <Modal open={isEditModalOpen} onClose={() => {setIsEditModalOpen(false)}}>
                <SimpleModalForm
                    headerText={`Edit ${tasksListName}?`}
                    submitText={"Edit List Name"}
                    discardText={"Discard"}
                    setOpenModal={setIsEditModalOpen}
                    setNewTaskListName={setDeleteEditTaskListName}
                    taskErrorText={editTaskListHelper}
                    newTaskListName={deleteEditTaskListName}
                    submit={editTaskList}/>
            </Modal>
        </>
    );
};

const mapStateToProps = ({tasksList, draggingTask}, {tasksListName}) => ({
    tasks: tasksList[tasksListName].tasks,
    draggingTask,
    tasksListNames: Object.keys(tasksList),
});

const mapDispatchToProps = (dispatch) => ({
    updateToOfCurrentDraggingTask: payload => dispatch(updateToOfCurrentDraggingTask(payload)),
    updateIndexOfCurrentDraggingTask: payload => dispatch(updateIndexOfCurrentDraggingTask(payload)),
    transferTask: payload => dispatch(transferTask(payload)),
    editTaskListName: payload => dispatch(editTaskListName(payload)),
    deleteTaskList: payload => dispatch(deleteTaskList(payload)),
    deleteTask: payload => dispatch(deleteTask(payload)),
    swapTasksList: payload => dispatch(swapTasksList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TasksList));
