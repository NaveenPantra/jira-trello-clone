import React from 'react';
import TasksListContainer from "./containers/tasksList/TasksList.container";
import Info from "./components/Info/Info";
import Emojies from "./components/Emojies/Emojies";
import AuthorInfo from "./components/commons/AuthorInfo";
import ExtraLink from "./components/commons/ExtraLink";

function App() {
  return (
    <>
        <Info/>
        <Emojies />
        <TasksListContainer/>
        <ExtraLink/>
        <AuthorInfo/>
    </>
  );
}

export default App;
