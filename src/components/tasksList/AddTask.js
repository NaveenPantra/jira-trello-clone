import React, {useState, useRef, useEffect} from 'react';
import withStyles from "react-jss";
import { connect } from "react-redux";
import {addTask} from "../../redux/tasks/tasks.actions";
import {addTaskID} from "../../redux/taksList/taskList.actions";
import {generateRandomString} from "../../utils/helpers";

const styles = {
    root: {
        zIndex: 1,
        padding: "1.3rem",
        boxShadow: "var(--shadow-dark)",
        borderRadius: 3,
        display: "block",
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translate(-50%, 0)",
        transition: "all .3s ease-in-out",
        background: "var(--color-grey-light-1)",
    },
    heading: {
        fontSize: "1.3rem",
        marginBottom: "1rem",
    },
    form: {
        width: "100%",
    },
    textArea: {
        border: "1px solid var(--color-text-light)",
        borderRadius: 3,
        resize: "none",
        width: "100%",
        height: "9rem",
        padding: ".5rem",
        fontSize: "1.5rem",
    },
    options: {
        marginTop: "1rem",
        display: "flex",
        justifyContent: "space-between",
    },
    submit: {
        color: "var(--color-grey-light-1)",
        padding: ".7rem 1rem",
        borderRadius: 3,
        width: "40%",
        background: "var(--color-text)"
    },
    discard: {
        width: "40%",
        padding: ".7rem 1rem",
        borderRadius: 3,
        border: "1px solid var(--color-text)"
    },

    close: {
        transform: "translate(-50%, 100%)",
        opacity: 0,
    }
};

const AddTask = ({open, onClose, tasksListName, classes, addTask, addTaskID}) => {
    const [taskText, setTaskText] = useState("");
    const textAreaRef = useRef();
    function handleKeyPress(event) {
        if (event.keyCode === 27) {
            onClose();
        }
    }
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                textAreaRef.current.focus();
            }, 310);
            console.log("Adding Event");
            document.addEventListener("keydown", handleKeyPress);
        }
        return () => {
            console.log("Removing Event");
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, [open]);
    function handleSubmit(event) {
        event.preventDefault();
        if (taskText.length === 0) return 0;
        const ID = generateRandomString();
        addTask({
            ID,
            taskText,
            isEditing: false,
        });
        addTaskID({
            tasksListName,
            newTaskID: ID,
            index: 0,
        });
        setTaskText("");
        onClose();
    }
    return (
        <section className={`${classes.root} ${open ? "" : classes.close}`}>
            <h6 className={classes.heading}>Add Task</h6>
            <form className={classes.form} onSubmit={handleSubmit}>
                <textarea
                    ref={textAreaRef}
                    id={tasksListName}
                    value={taskText}
                    onChange={e => {setTaskText(e.target.value)}}
                    name="taskText"
                    className={classes.textArea}/>
                <div className={classes.options}>
                    <button className={classes.submit}>Save</button>
                    <button
                        className={classes.discard}
                        onClick={e => {e.preventDefault(); onClose();}}>Discard</button>
                </div>
            </form>
        </section>
    );
};


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    addTask: payload => dispatch(addTask(payload)),
    addTaskID: payload => dispatch(addTaskID(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddTask));
