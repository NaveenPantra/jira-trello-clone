import React, {useState, useEffect} from 'react';
import withStyles from "react-jss";
import Modal from "../commons/Modal";
import InitialImage from "./../../assets/images/initial.png";
import DragDropTask from "./../../assets/images/dragDropTask.png";
import SwapTaskListImage from "./../../assets/images/swapTaskList.png";
import AddTaskImage from "./../../assets/images/addTask.png";
import EditTaskImage from "./../../assets/images/editTask.png";
import DeleteTaskImage from "./../../assets/images/deleteTask.png"
import EditTaskListImage from "./../../assets/images/editTaskListName.png";
import DeleteTaskListImage from "./../../assets/images/deleteTaskList.png";
import AddTaskListImage from "./../../assets/images/addTaskList.png";

const styles = {
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        transform: "translate(20%, 20%)",
        boxShadow: "var(--shadow-light)",
        borderRadius: "50%",
        cursor: "pointer",
        "&:hover": {
            boxShadow: "var(--shadow-dark)",
        },
    },
    iconHolder: {
        fontSize: "2rem",
        padding: "1rem",
        borderRadius: "50%",
        display: "flex",
    },
    modal: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "2rem",
        borderRadius: 3,
        background: "var(--color-grey-light-1)",
        zIndex: "var(--z-index-modal-child)",
        width: "90rem",
        maxWidth: "90vw",
        maxHeight: "80vh",
        overflow: "hidden",
    },
    modalHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "2rem",
    },
    heading: {
        fontSize: "1.5rem",
        animation: "pulse 1s ease-in-out infinite",
    },
    modalIconHolder: {
        fontSize: "2rem",
        display: "flex",
        cursor: "pointer",
    },
    modalBody: {},
    list: {
        overflowX: "hidden",
        overflowY: "scroll",
        maxHeight: "calc(80vh - 6rem)",
    },
    listItem: {
        margin: "2rem 1.5rem 6rem",
        padding: "2rem",
        border: "1px dashed var(--color-text-light)",
        borderRadius: 4,
        transition: "transform .3s",
        "&:last-child": {
            border: "none",
            textAlign: "center",
        },
        "&:hover": {
            boxShadow: "var(--shadow-light)",
        }
    },
    figure: {
        width: "100%",
        marginBottom: "2rem",
    },
    image: {
        width: "100%",
        height: "auto",
        objectFit: "contain",
        paddingBottom: "1rem",
    },
    figcaption: {
        fontSize: "1.3rem",
        textAlign: "center",
    },
    hr: {
        border: 0,
        height: 1,
        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), var(--color-grey-dark-3), rgba(0, 0, 0, 0))",
    },
    button: {
        padding: "1.5rem 3rem",
        border: "1px solid var(--color-text)",
        borderRadius: 4,
        fontSize: "1.6rem",
    },
    loveEmoji: {
        animation: "rubberBand 1.5s ease-in-out infinite",
        display: "inline-block",
    },
    speakerIcon: {
        display: "inline-block",
        transform: "translateY(1px)",
    },
    "@media only screen and (max-width: 480px)": {
        root: {
            padding: "1rem",
        },
        modalHeader: {
            marginBottom: "1.5rem",
        },
        listItem: {
            margin: "1rem .5rem 3rem",
            padding: "1rem",
        },
        figure: {
            marginBottom: "1rem",
        },
        figcaption: {
            fontSize: "1.3rem",
        },
        button: {
            fontSize: "1.3rem",
            padding: "1.5rem 2rem",
        }
    }
};

const Info = ({classes}) => {
    const [openModal, setOpenModal] = useState(false);
    function handleKeyDown(event) {
        if (event.keyCode === 27) {
            setOpenModal(false);
        }
    }
    useEffect(() => {
        if (openModal) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    });
    return (
        <>
            <section
                className={classes.root}
                onClick={() => {setOpenModal(true)}}>
                <div className={classes.iconHolder}>
                    <ion-icon name="information-circle-outline"></ion-icon>
                </div>
            </section>
            <Modal open={openModal} onClose={() => {setOpenModal(false)}}>
                <section className={classes.modal}>
                    <div className={classes.modalHeader}>
                        <h4 className={classes.heading}>
                            Info About App&nbsp;&nbsp;
                            <span role={"img"} aria-labelledby={"Speaker Emoji"} className={classes.speakerIcon}>🔊</span>
                        </h4>
                        <div
                            onClick={() => {setOpenModal(false)}}
                            className={classes.modalIconHolder}>
                            <ion-icon name="close-outline" />
                        </div>
                    </div>
                    <div className={classes.modalBody}>
                        <ul className={classes.list}>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={InitialImage} alt="Initial"/>
                                    <figcaption className={classes.figcaption}>1. The Initial State of the Application.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={DragDropTask} alt="Drag and Drop"/>
                                    <figcaption className={classes.figcaption}>2. You can Drag and Drop Task with in the Task List or across the Task Lists.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={SwapTaskListImage} alt="Drag and Drop"/>
                                    <figcaption className={classes.figcaption}>3. You can Swap the Task List with the adjacent Task List by click on arrows.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={AddTaskImage} alt="Drag and Drop"/>
                                    <figcaption className={classes.figcaption}>4. You can Add Task by clicking on Plus Icon at bottom of Task List.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={EditTaskImage} alt="Drag and Drop"/>
                                    <figcaption className={classes.figcaption}>5. You can Edit Task by clicking on Edit Icon on each task.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={DeleteTaskImage} alt="Drag and Drop"/>
                                    <figcaption className={classes.figcaption}>6. You can Delete Task by clicking on Icon at Top of the Task.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={EditTaskListImage} alt="Drag and Drop"/>
                                    <figcaption className={classes.figcaption}>7. You can Edit Task List by clicking on Edit Icon at bottom of Task List.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={DeleteTaskListImage} alt="Drag and Drop"/>
                                    <figcaption className={classes.figcaption}>8. You can Delete Task List by clicking on Bin Icon at bottom of Task List.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <figure className={classes.figure}>
                                    <img className={classes.image} src={AddTaskListImage} alt="Drag and Drop"/>
                                    <figcaption className={classes.figcaption}>9. You can Add Task List by clicking on PLUS Icon at end of all Task Lists.</figcaption>
                                </figure>
                            </li>
                            <li className={classes.listItem}>
                                <button
                                    onClick={() => {setOpenModal(false)}}
                                    className={classes.button}>
                                    🤟🏻
                                    <span className={classes.loveEmoji} role={"img"} aria-labelledby={"Love Emoji"}>&nbsp;😍&nbsp;</span>
                                    &nbsp;&nbsp;Start Using APP&nbsp;&nbsp;
                                    <span className={classes.loveEmoji} role={"img"} aria-labelledby={"Love Emoji"}>&nbsp;😍&nbsp;</span>
                                    🤟
                                </button>
                            </li>
                        </ul>
                    </div>
                </section>
            </Modal>
        </>
    );
};

export default withStyles(styles)(Info);
