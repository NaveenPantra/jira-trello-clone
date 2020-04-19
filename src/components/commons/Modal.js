import React from 'react';
import ReactDOM from "react-dom";
import withStyles from "react-jss";

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        display: "block",
        height: "100vh",
        width: "100vw",
        background: "var(--color-modal-overlay)",
        zIndex: 'var(--z-index-modal)',
    }
};

const Modal = ({open = false, children = null, onClose = () => {}, classes}) => {
    if (!open) return null;
    const bodyElement = document.querySelector("body");
    return ReactDOM.createPortal(
        <>
            <div className={classes.overlay} onClick={onClose} />
            {children}
        </>
        , bodyElement);
};

export default withStyles(styles)(Modal);
