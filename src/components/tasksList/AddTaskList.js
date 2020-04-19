import React, {useState} from 'react';
import { connect } from "react-redux";
import withStyles from "react-jss";
import {addTaskList} from "../../redux/taksList/taskList.actions";
import Modal from "../commons/Modal";
import SimpleModalForm from "../commons/SimpleModalForm";

const styles = {
    root: {
        width: "34rem",
        height: "30rem",
        margin: "1.5rem",
        display: "inline-block",
        overflow: "hidden",
        position: "relative",
        boxShadow: "var(--shadow-light)",
        borderRadius: 4,
    },
    addWrapper: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        cursor: "pointer",

        "&:hover": {

        },
    },
    iconWrapper: {
        fontSize: "6rem",
        display: "flex",
        justifyContent: "center",
        transition: "all .3s",
        "&:hover": {
            animation: "rotate  1s cubic-bezier(0.25, 1, 0.5, 1) infinite",
        }
    },
    text: {
        fontSize: "2.6rem",
        fontWeight: 400,
    },
};

const AddTaskList = ({classes, tasksList, addTaskList}) => {
    const [openModal, setOpenModal] = useState(false);
    const [newTaskListName, setNewTaskListName] = useState("");
    const [taskErrorText, setTaskErrorText] = useState("");
    function createNewTaskList() {
        if (newTaskListName.length === 0) {
            setTaskErrorText("Not valid Task List name.");
            return 0;
        }
        const isTaskExist = tasksList.some(taskListName => taskListName.toLowerCase() === newTaskListName.toLowerCase());
        if (isTaskExist) {
            setTaskErrorText("Task List with this name already exist.");
            return 0;
        }
        addTaskList({newTaskListName});
        setTaskErrorText("");
        setOpenModal(false);
        setNewTaskListName("");
    }
    return (
        <>
            <div className={classes.root}>
                <div
                    className={classes.addWrapper}
                    onClick={() => {setOpenModal(true)}}>
                    <div
                        className={classes.iconWrapper}>
                        <ion-icon name="add-circle-outline" />
                    </div>
                    <p className={classes.text}>🥙Add Task List🥙</p>
                </div>
            </div>
            <Modal open={openModal} onClose={() => {setOpenModal(false)}}>
                <SimpleModalForm
                    headerText={"Add Task List"}
                    submitText={"Create List"}
                    discardText={"Discard"}
                    setOpenModal={setOpenModal}
                    setNewTaskListName={setNewTaskListName}
                    taskErrorText={taskErrorText}
                    newTaskListName={newTaskListName}
                    submit={createNewTaskList}/>
            </Modal>
        </>
    );
};

const mapStateToProps = ({tasksList}) => ({
    tasksList: Object.keys(tasksList),
});
const mapDispatchToProps = (dispatch) => ({
    addTaskList: payload => dispatch(addTaskList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddTaskList));
