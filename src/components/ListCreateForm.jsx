import React, { useRef, useState } from "react";

const ListCreateForm = ({ lists, addList, activeList, selectList }) => {
  const addListRef = useRef(null);
  const formRef = useRef();

  const handleListActive = (id) => {
    selectList(id);
  };

  const handleAddListForm = (e) => {
    e.preventDefault();
    const inputName = addListRef.current.value.trim(); 
    if (inputName === "") {
      return;
    }

    const newList = {
      id: Date.now(),
      name: inputName,
    };

    addList(newList);
    formRef.current.reset();
  };

  return (
    <>
      <div className=" md:col-span-4 col-span-12 mb-5">
        <div className="flex flex-col gap-5">
          <div className=" text-light-clr">
            <h1 className="text-xl font-bold mb-3">My lists</h1>
            <div className="px-4">
              <ul className="list-circle list-inside">
                {lists.map(({ id, name }) => (
                  <li
                    className={`${
                      activeList === id && "font-bold duration-300"
                    } font-[200] cursor-pointer mb-2`}
                    key={id}
                    onClick={() => handleListActive(id)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <form ref={formRef} onSubmit={handleAddListForm}>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className=" text-light-clr font-bold text-xl hover:opacity-70 duration-200 active:scale-75"
              >
                +
              </button>
              <div>
                <input
                  ref={addListRef}
                  type="text"
                  className=" bg-transparent border-b focus-visible:outline-none text-light-clr text-sm placeholder:text-light-clr placeholder:opacity-40 p-2"
                  placeholder="new list name"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ListCreateForm;
