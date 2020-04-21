import React, {useState, useRef, useEffect} from 'react';
import { connect } from "react-redux";
import withStyles from "react-jss";
import {toggleEditingText, updateTask, deleteTask} from "../../redux/tasks/tasks.actions";
import {deleteTaskID} from "../../redux/taksList/taskList.actions";
import {setCurrentDraggingTaskData, deleteCurrentDraggingTaskData, updateIndexOfCurrentDraggingTask} from "../../redux/draggingTask/draggingTask.actions";
import {clearPreviousDraggingElements, clearClassesForElements} from "../../utils/helpers";

const styles = {
    root: {
        padding: "1.5rem",
        borderRadius: 3,
        boxShadow: "var(--shadow-light)",
        margin: "1rem 1rem",
        marginBottom: "2rem",
        transition: "all .3s ease-in-out",
        position: "relative",
        perspective: "150rem",
        maxHeight: "100%",
        border: "2px dashed transparent",
        "&:last-child": {
            marginBottom: "9rem",
        },
        "&:active": {
        },
        "&:hover .deleteHolder": {
            display: "flex",
            opacity: 1,
            transform: "scale(1)",
        },
        // "&:hover": {
        //     transform: "scale(1.07)",
        // }
    },
    taskText: {
        fontSize: "1.4rem",
        whiteSpace: 'normal',
        // wordBreak: "break-all",
        overflowWrap: "break-word",
        paddingBottom: "1.5rem",
        borderBottom: "var(--line)",
    },
    options: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0 0",
        fontSize: "2.2rem"
    },
    isEditing: {
        transform: "rotateX(180deg) !important",
    },
    front: {
        opacity: 1,
        transition: "all .3s ease-in-out"
    },
    frontEditing: {
        opacity: 0,
    },
    back: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotateX(180deg)",
        background: "#fff",
        opacity: 0,
        transition: "all .5s",
        maxHeight: 0,
    },
    textArea: {
        width: "90%",
        height: "calc(100% - 3rem)",
        display: "block",
        margin: "3% auto",
        padding: ".6rem",
        border: "1px solid var(--color-text)"
    },
    backOptions: {
        width: "90%",
        margin: "0 auto",
        padding: 0,

    },
    isEditingBackOpen: {
        opacity: 1,
        maxHeight: "100%",
    },
    deleteHolder: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -6,
        right: -7,
        fontSize: "1.8rem",
        padding: ".3rem",
        borderRadius: "50%",
        background: "white",
        boxShadow: "var(--shadow-dark)",
        cursor: "pointer",
        opacity: 0,
        transform: "scale(0)",
        transition: "all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    },
};

function getLines(str, len = 46) {
    const lines = [];
    let currentIndex = 0;
    lines.push("");
    let counter = 0;
    str.split("").map((letter, i) => {
        counter++;
        if (counter === len) {
            counter = 0;
            counter++;
            currentIndex++;
            lines.push("");
            if (letter !== " ") {
                const lastIndex = lines[currentIndex - 1].lastIndexOf(" ");
                const tempLine = lines[currentIndex - 1].slice(0, lastIndex);
                lines[currentIndex] = lines[currentIndex - 1].slice(lastIndex);
                lines[currentIndex - 1] = tempLine;
            }
        }
        lines[currentIndex] = `${lines[currentIndex]}${letter}`;
    });
    return lines;
}

const Task = ({taskText, ID, isEditing, tasksListName, index, classes, toggleEditingText, updateTask, draggingTask, setCurrentDraggingTaskData, updateIndexOfCurrentDraggingTask, deleteTaskID, deleteTask}) => {
    const itemRef = useRef();
    const taskTextRef = useRef();
    const [editTaskText, setEditTaskText] = useState(taskText);
    const [isDraggable, setIsDraggable] = useState(false);
    useEffect(() => {
        try {
            taskTextRef.current.innerText = taskText;
        } catch(e) {}
    }, [isEditing]);
    function toggleEditTask() {
        toggleEditingText({taskID: ID});
    }
    function updateEditingTask() {
        updateTask({editTaskText, editTaskID: ID});
        toggleEditTask();
    }
    function handleOnDragStart(event) {
        clearPreviousDraggingElements();
        setCurrentDraggingTaskData({ID, from: tasksListName, index, height: event.currentTarget.clientHeight});
        const currentElement = itemRef.current.cloneNode(true);
        currentElement.classList.add("draggingClone");
        document.body.appendChild(currentElement);
        event.dataTransfer.setDragImage(currentElement, 0, 0);
        event.currentTarget.style.opacity = 0.5;
        event.currentTarget.style.transform = "scale(0.9)";
    }
    function handleOnDragEnd(event) {
        console.log("On Drag End");
        event.currentTarget.style.opacity = "1";
        event.currentTarget.style.transform = "none";
        clearPreviousDraggingElements();
        deleteCurrentDraggingTaskData();
    }
    function handleOnDragOver(event) {
        event.preventDefault();
        if (Object.keys(draggingTask).length === 0) return 0;
        event.dataTransfer.dropEffect = "move";
        const {currentIndex, from, to} = draggingTask;
        itemRef.current.classList.add("dragOverClass");
        if(from === tasksListName) {
            if (currentIndex === index) return 0;
            updateIndexOfCurrentDraggingTask({index});
        } else {
            // if (currentIndex === index && originalIndex !== index && from !== tasksListName) return 0;
            // console.log("Update Index");
            if (currentIndex === index && to === tasksListName) return 0;
            updateIndexOfCurrentDraggingTask({index});
        }
    }
    function handleOnDragLeave(event) {
        event.preventDefault();
        clearClassesForElements(".dragOverClass", "dragOverClass");
    }
    function deleteCurrentTask() {
        itemRef.current.classList.add("deletingItem");
        setTimeout(() => {
            deleteTaskID({tasksListName, index});
            deleteTask({ID});
        }, 300);
    }
    return (
        <li
            draggable={!isEditing && isDraggable}
            id={ID}
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
            onDragOver={handleOnDragOver}
            onDragLeave={handleOnDragLeave}
            onMouseUp={() => {setIsDraggable(false)}}
            ref={itemRef}
            className={`${classes.root} ${isEditing ? classes.isEditing : ""}`}>
            <div className={`${classes.front} ${isEditing ? classes.frontEditing : ""}`}>
                <p
                    ref={taskTextRef}
                    className={classes.taskText}
                    style={{
                        transform: !isEditing ? "scale(1)" : "scale(0)",
                        opacity: !isEditing ? 1 : 0,
                        transition: "all 0.5s",
                    }}>
                    {taskText}
                </p>
                <div
                    className={classes.options}
                    style={{
                        transform: !isEditing ? "scale(1)" : "scale(0)",
                        opacity: !isEditing ? 1 : 0,
                        transition: "all 0.5s",
                    }}>
                    <ion-icon
                        style={{
                            cursor: "grab",
                        }}
                        onMouseDown={() => {setIsDraggable(true)}}
                        onMouseUp={() => {setIsDraggable(false)}}
                        name="hand-right-outline" />
                    <ion-icon
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={toggleEditTask}
                        name="create-outline" />
                </div>
                <div
                    className={`${classes.deleteHolder} deleteHolder`}
                    onClick={deleteCurrentTask}>
                    <ion-icon name="close-outline" />
                </div>
            </div>
            <div className={`${classes.back} ${isEditing ? classes.isEditingBackOpen : ""}`}>
                <textarea
                    value={editTaskText}
                    onChange={e => {setEditTaskText(e.target.value)}}
                    name={ID}
                    style={{
                        transform: isEditing ? "scale(1)" : "scale(0)",
                        opacity: isEditing ? 1 : 0,
                        transition: "all 0.5s",
                    }}
                    className={classes.textArea} />
                <div
                    className={`${classes.options} ${classes.backOptions}`}
                    style={{
                        transform: isEditing ? "scale(1)" : "scale(0)",
                        opacity: isEditing ? 1 : 0,
                        transition: "all 0.5s",
                    }}>
                    <ion-icon
                        name="close-circle-outline"
                        onClick={toggleEditTask}
                        style={{
                            cursor: "pointer"
                        }}/>
                    <ion-icon
                        name="checkmark-circle-outline"
                        onClick={updateEditingTask}
                        style={{
                            cursor: "pointer"
                        }}/>
                </div>
            </div>
        </li>
    );
};

const mapStateToProps = ({tasks, draggingTask}, {ID}) => ({
    taskText: tasks[ID].taskText,
    isEditing: tasks[ID].isEditing,
    draggingTask,
});

const mapDispatchToProps = (dispatch) => ({
    toggleEditingText: payload => dispatch(toggleEditingText(payload)),
    updateTask: payload => dispatch(updateTask(payload)),
    setCurrentDraggingTaskData: payload => dispatch(setCurrentDraggingTaskData(payload)),
    updateIndexOfCurrentDraggingTask: payload => dispatch(updateIndexOfCurrentDraggingTask(payload)),
    deleteTask: payload => dispatch(deleteTask(payload)),
    deleteTaskID: payload => dispatch(deleteTaskID(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Task));
