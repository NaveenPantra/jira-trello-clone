import React, {useEffect, useRef} from 'react';
import withStyles from "react-jss";

const styles = {
    modal: {
        background: "var(--color-grey-light-1)",
        position: "fixed",
        width: "35rem",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        borderRadius: 4,
        boxShadow: "var(--shadow-light)",
        zIndex: "var(--z-index-modal-child)",
    },
    modalHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.7rem",
    },
    heading: {
        fontSize: "1.5rem",
    },
    headingIcon: {
        display: "flex",
        fontSize: "2.1rem",
        cursor: "pointer",
    },
    modalBody: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        border: "1px solid var(--color-text)",
        padding: "1rem",
        fontSize: "1.5rem",
        color: "var(--color-text)",
        outline: "none",
        marginBottom: "1.7rem",
        borderRadius: 3,
        background: "#f4f2f200",
        position: "relative",
        display: "block",
    },
    buttonsHolder: {
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        justifyContent: "space-between",
        "& button": {
            border: "1px solid var(--color-text)",
            borderRadius: 3,
            width: "40%",
            padding: ".6rem",
            fontSize: "1.4rem"
        },
        "& button:first-child": {
            background: "var(--color-text)",
            color: "var(--color-grey-light-1)",
        },
        "& button:last-child": {}
    },
    taskErrorText: {
        transform: "translateY(-1.3rem)",
    },
};

const SimpleModalForm = ({classes = {}, headerText, submitText, discardText, setOpenModal, setNewTaskListName, taskErrorText, newTaskListName, isReadOnly = false, submit }) => {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    });
    function handleKeyDown(event) {
        if (event.keyCode === 27) {
            setOpenModal(false);
        }
    }
    return (
        <section className={classes.modal}>
            <div className={classes.modalHeader}>
                <h4 className={classes.heading}>{headerText}</h4>
                <div
                    className={classes.headingIcon}
                    onClick={() => {setOpenModal(false)}}>
                    <ion-icon name="close-outline" />
                </div>
            </div>
            <div className={classes.modalBody}>
                <input
                    ref={inputRef}
                    readOnly={isReadOnly}
                    className={classes.input}
                    onChange={(e) => {setNewTaskListName(e.target.value)}}
                    value={newTaskListName}
                    type="text"/>
                <span className={classes.taskErrorText}>{taskErrorText}</span>
                <div className={classes.buttonsHolder}>
                    <button onClick={submit}>{submitText}</button>
                    <button onClick={() => {setOpenModal(false)}}>{discardText}</button>
                </div>
            </div>
        </section>
    );
};

export default withStyles(styles)(SimpleModalForm);
