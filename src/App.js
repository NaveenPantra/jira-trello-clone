import React from 'react';
import TasksListContainer from "./containers/tasksList/TasksList.container";
import Info from "./components/Info/Info";

function App() {
  return (
    <>
        <Info/>
        <TasksListContainer/>
    </>
  );
}

export default App;
