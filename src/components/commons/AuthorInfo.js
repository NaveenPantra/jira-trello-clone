import React from 'react';
import withStyles from "react-jss";
import {SOCIAL_LINKS_TEXT} from "../../utils/constants";

const styles = {
    root: {
        position: "fixed",
        bottom: 0,
        right: 0,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        background: "#fff",
        fontSize: "1.5rem",
    },
    textWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "1.5rem",
    },
    heading: {
        fontWeight: 700,
    },
    text: {
        display: "flex",
        alignItems: "center",
    },
    iconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& a:hover": {
            animation: "bounce 1s ease-in-out infinite",
        },
    },
    icon: {
        display: "flex",
        alignItems: "center",
        marginRight: "1rem",
        fontSize: "2rem",
        color: "var(--color-text)",
        transition: "all .3s ease-in-out",
    },
    heart: {
        display: "flex",
        animation: "heartBeat 1.3s ease-in-out infinite",
    },
};

const AuthorInfo = ({classes}) => {
    return (
        <footer className={classes.root}>
            <div className={classes.textWrapper}>
                <p className={classes.text}>Made by&nbsp;</p>
                <p className={classes.heading}>&nbsp;Naveen Pantra&nbsp;</p>
                <p className={classes.text}>&nbsp;With&nbsp;&nbsp;<span className={classes.heart}><ion-icon name="heart" /></span>&nbsp;</p>
            </div>
            <div className={classes.iconWrapper}>
                <a
                    href={SOCIAL_LINKS_TEXT.GIT_HUB}
                    target={"_blank"}
                    rel={"noopener"}
                    className={classes.icon}>
                    <ion-icon name="logo-github" />
                </a>
                <a
                    href={SOCIAL_LINKS_TEXT.LINKED_IN}
                    target={"_blank"}
                    rel={"noopener"}
                    className={classes.icon}>
                    <ion-icon name="logo-linkedin" />
                </a>
                <a
                    href={SOCIAL_LINKS_TEXT.CODE_PEN}
                    target={"_blank"}
                    rel={"noopener"}
                    className={classes.icon}>
                    <ion-icon name="logo-codepen" />
                </a>
            </div>
        </footer>
    );
};

export default withStyles(styles)(AuthorInfo);
