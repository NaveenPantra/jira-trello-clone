import React from 'react';
import TasksListContainer from "./containers/tasksList/TasksList.container";
import Info from "./components/Info/Info";
import Emojies from "./components/Emojies/Emojies";

function App() {
  return (
    <>
        <Info/>
        <Emojies />
        <TasksListContainer/>
    </>
  );
}

export default App;
