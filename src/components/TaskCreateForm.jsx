import React, { useRef, useState } from "react";

const TaskCreateForm = ({
  tasks,
  checkList,
  addTask,
  deleteList,
  deleteTask,
  activeList,
  selectedListName,
  addEditList,
}) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef();

  const totalTasks = tasks.filter(
    (task) => task.isDone === false && task.listId === activeList
  ).length;

  const formRef = useRef();

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskName = inputRef.current.value.trim();
    if (taskName === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      listId: activeList,
      taskName,
      isDone: false,
    };
    addTask(newTask);
    formRef.current.reset();
  };

  const handleCheck = (id) => {
    checkList(id);
  };

  const handleDeleteList = () => {
    deleteList(activeList);
  };

  const handleDeleteTask = () => {
    deleteTask();
  };

  const handleEdit = (id, taskName) => {
    setEditTaskId(id);
    setNewTaskName(taskName);
  };

  const handleSaveEdit = (id) => {
    setEditTaskId(null);
    addEditList(id, newTaskName);
  };

  const handleInputChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleKeyUp = (e, id) => {
    if (e.key === "Enter") {
      handleSaveEdit(id);
    }
  };

  return (
    <>
      {activeList !== null && (
        <div className="md:col-span-8 col-span-12">
          <div className="bg-light-clr shadow-2xl overflow-auto ">
            <div className="flex items-center justify-between bg-zinc-200 p-6">
              <h3 className="font-bold text-2xl">{selectedListName}</h3>
              <p className="text-sm text-zinc-500">
                {totalTasks} tasks remaining
              </p>
            </div>
            {tasks
              .filter((task) => task.listId === activeList)
              .map(({ id, taskName, isDone }) => (
                <div
                  key={id}
                  className="px-6 py-4 flex items-center justify-between gap-5 border-b"
                >
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      value=""
                      id={id}
                      className="appearance-none inline-block w-6 h-6 cursor-pointer border-2 border-current rounded-full scale-[0.6] duration-200 hover:scale-[0.75] hover:text-primary-clr text-dark-clr checked:bg-primary-clr checked:border-primary-clr shadow-inset-white"
                      checked={isDone}
                      onChange={() => handleCheck(id)}
                    />
                    {editTaskId === id ? (
                      <input
                      ref={editInputRef}
                        type="text"
                        className="bg-transparent border-b border-dark-clr focus-visible:outline-none text-dark-clr text-lg placeholder:text-dark-clr placeholder:opacity-40 p-2"
                        placeholder="Enter task name"
                        value={newTaskName}
                        onChange={handleInputChange}
                        onBlur={() => handleSaveEdit(id)}
                        onKeyUp={(e) => handleKeyUp(e, id)}
                      />
                    ) : (
                      <label
                        htmlFor={id}
                        className={`${
                          isDone && "line-through opacity-35"
                        } select-none cursor-pointer duration-200`}
                      >
                        {taskName}
                      </label>
                    )}
                  </div>

                  <button
                    onClick={() => handleEdit(id, taskName)}
                    className="text-red-600"
                  >
                    Edit
                  </button>
                </div>
              ))}
            <div className="p-6">
              <form ref={formRef} onSubmit={handleAddTask}>
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="text-dark-clr font-bold text-2xl hover:opacity-70 duration-200 active:scale-75"
                  >
                    +
                  </button>
                  <div>
                    <input
                      ref={inputRef}
                      type="text"
                      className="bg-transparent border-b border-dark-clr focus-visible:outline-none text-dark-clr text-lg placeholder:text-dark-clr placeholder:opacity-40 p-2"
                      placeholder="Enter task name"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="p-6 flex justify-between items-center">
            <button
              onClick={handleDeleteTask}
              className="text-sm hover:opacity-100 duration-200 active:scale-75 text-light-clr opacity-50"
            >
              Clear completed tasks
            </button>
            <button
              onClick={handleDeleteList}
              className="text-sm hover:opacity-100 duration-200 active:scale-75 text-light-clr opacity-50"
            >
              Delete list
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCreateForm;
