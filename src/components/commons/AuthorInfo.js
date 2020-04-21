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
    },
    icon: {
        display: "flex",
        alignItems: "center",
        marginRight: "1rem",
        fontSize: "2rem",
        color: "var(--color-text)",
    }
};

const AuthorInfo = ({classes}) => {
    return (
        <footer className={classes.root}>
            <div className={classes.textWrapper}>
                <p className={classes.text}>Made by&nbsp;</p>
                <p className={classes.heading}>&nbsp;Naveen Pantra&nbsp;</p>
                <p className={classes.text}>&nbsp;With&nbsp;&nbsp;<ion-icon name="heart" />&nbsp;</p>
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
