import React, {useEffect, useState, useRef} from 'react';
import withStyles from "react-jss";
import Modal from "../commons/Modal";
import {EMOJIS} from "../../utils/constants";

const styles = {
    root: {
        position: "fixed",
        top: 0,
        right: 0,
        transform: "translate(-20%, 20%)",
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
    drawer: {
        position: "fixed",
        top: "50%",
        right: 0,
        transform: "translate(0%, -50%)",
        transition: "transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
        padding: "3rem 5rem 3rem 3rem",
        borderRadius: 3,
        background: "var(--color-grey-light-1)",
        zIndex: "var(--z-index-modal-child)",
        height: "100vh",
        width: "50vw",
        overflow: "scroll",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "2.4rem",
        marginBottom: "5rem",
        "& span": {
            cursor: "pointer",
        },
    },
    drawerBody: {},
    emojiWrapper: {
        display: 'flex',
        flexDirection: "column",
        marginBottom: "3rem",
    },
    heading: {
        fontSize: "1.7rem",
        marginBottom: "1rem",
        textTransform: "capitalize",
    },
    emojis: {
        fontFamily: "Segoe UI Emoji",
        fontSize: "3rem",
        letterSpacing: 5,
        lineHeight: 2,
        "& span": {
            fontFamily: "Segoe UI Emoji",
        },
    }
};

const Emojies = ({classes}) => {
    const [openModal, setOpenModal] = useState(false);
    const inputRef = useRef();
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
    function handleKeyDown(event) {
        if (event.keyCode === 27) {
            setOpenModal(false);
        }
    }
    return (
        <>
            <section
                className={classes.root}
                onClick={() => {setOpenModal(true)}}>
                <div title={"🍉 emojis 🍉"} className={classes.iconHolder}>
                    <ion-icon name="grid-outline" />
                </div>
            </section>
            <Modal open={openModal} onClose={() => {setOpenModal(false)}}>
                <section className={`${classes.drawer}`}>
                    <header className={classes.drawerHeader}>
                        <h4>🦧 Emojis 🐶</h4>
                        <span onClick={() => {setOpenModal(false)}}>❌</span>
                    </header>
                    <textarea ref={inputRef} />
                    <section className={classes.drawerBody}>
                        {
                            Object.keys(EMOJIS).map((emojiType, index) => (
                                <div key={`${emojiType}-${index}`} className={classes.emojiWrapper}>
                                    <h6 className={classes.heading}>
                                        {emojiType.toLowerCase()}
                                    </h6>
                                    <p className={classes.emojis}>
                                        {EMOJIS[emojiType]}
                                    </p>
                                </div>
                            ))
                        }
                    </section>
                </section>
            </Modal>
        </>
    );
};

export default withStyles(styles)(Emojies);
