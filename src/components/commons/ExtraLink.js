import React from 'react';
import withStyles from "react-jss";
import {SOCIAL_LINKS_TEXT} from "../../utils/constants";

const styles = {
    root: {
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        background: "#fff",
        fontSize: "1.5rem",
    },
    link: {
        margin: "0 1rem",
        border: "none",
        fontWeight: 700,
        position: "relative",
        transition: "all 1s linear",
        display: "block",
        "&:after": {
            content: '""',
            zIndex: -1,
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "35%",
            borderRadius: 3,
            transition: "all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
            background: "var(--color-grey-light-3)",
        },
        "&:hover": {
            color: "var(--color-grey-light-1)",
            "&:after": {
                height: "100%",
                background: "var(--color-text)",
            },
        }
    }
};

const ExtraLink = ({classes}) => {
    return (
        <footer className={classes.root}>
            Visit My
            <a
                className={classes.link}
                href={SOCIAL_LINKS_TEXT.SORTING_VIS}
                target={"_blank"}
                rel={"noopener"}>&nbsp;&nbsp;🧠🧠 Sorting Visualization 📊📊&nbsp;&nbsp;</a>
            .
        </footer>
    );
};

export default withStyles(styles)(ExtraLink);
