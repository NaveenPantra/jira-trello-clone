import React from 'react';
import { connect } from "react-redux";
import withStyles from "react-jss";
import TasksList from "../../components/tasksList/TasksList";
import AddTaskList from "../../components/tasksList/AddTaskList";

const styles = {
    root: {
        width: "95vw",
        margin: "auto",
        padding: "1.5rem",
        borderRadius: 5,
        boxShadow: "var(--shadow-dark)",
        overflow: "scroll",
        whiteSpace: 'nowrap',
    },
};

const TasksListContainer = ({tasksListNames, classes}) => {
    return (
        <main className={classes.root}>
            {
                tasksListNames.map(tasksListName => <TasksList key={tasksListName} tasksListName={tasksListName}/>)
            }
            <AddTaskList />
        </main>
    );
};

const mapStateToProps = ({tasksList}) => ({
    tasksListNames: Object.keys(tasksList),
});

export default connect(mapStateToProps)(withStyles(styles)(TasksListContainer));
