import React, { useState, useEffect } from "react";
import MainHeader from "./components/MainHeader";
import ListCreateForm from "./components/ListCreateForm";
import TaskCreateForm from "./components/TaskCreateForm";

const App = () => {
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("lists")) || []
  );

  const [activeList, setActiveList] = useState(
    JSON.parse(localStorage.getItem("selectId")) || null
  );

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("selectId", JSON.stringify(activeList));
  }, [lists, tasks, activeList]);

  const addList = (newList) => {
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  const deleteList = () => {
    setLists(lists.filter((list) => list.id !== activeList));
    if (activeList !== null) {
      setActiveList(null);
      localStorage.removeItem("selectId");
    }
  };

  const selectList = (id) => {
    setActiveList(id);
    localStorage.setItem("selectId", JSON.stringify(id));
    const currentSelectId = lists.find(list => list.id === id);
    return currentSelectId.name; // Return the name of the selected list
  };

  const addTask = (newTask) => {
    const updateTasks = [...tasks, newTask];
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  };

  const deleteTask = () => {
    setTasks(tasks.filter(task => task.isDone !== true));
  };
  

  const checkList = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      })
    );
  };

  const addEditList = (id, taskname) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, taskName: taskname }; // Use taskName instead of taskname
      }
      return task;
    }));
  };
  

  // Get the name of the selected list
  const selectedListName = activeList ? lists.find(list => list.id === activeList)?.name : null;

  return (
    <>
      <main className="grid grid-cols-12 container">
        <MainHeader>Stuff I need to do</MainHeader>
        <ListCreateForm
          lists={lists}
          addList={addList}
          activeList={activeList}
          selectList={selectList}
        />
        <TaskCreateForm
          tasks={tasks}
          checkList={checkList}
          addTask={addTask}
          deleteList={deleteList}
          lists={lists}
          deleteTask={deleteTask}
          activeList={activeList}
          selectedListName={selectedListName} // Pass the name of the selected list as a prop
          addEditList={addEditList}
        />
      </main>
    </>
  );
};

export default App;
