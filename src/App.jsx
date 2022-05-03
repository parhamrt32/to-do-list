import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import { CgMenuRight } from "react-icons/cg";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

function App() {
  const form1 = useRef(null);
  const [isAdd, setIsAdd] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("completed")) || []
  );
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName) {
      setTasks([...tasks, taskName]);
      setTaskName("");
    }
    //form1.current.classList.remove("form-show");
    setIsAdd(false);
  };
  const handleComplete = (e) => {
    const tempTask = e.target.textContent;
    console.log(tempTask);
    setCompleted([...completed, tempTask]);
    setTasks(tasks.filter((item) => item.trim() !== tempTask.trim()));
  };

  return (
    <div className="App">
      <section className="container">
        <nav className="nav">
          <h2 className="mobile-title">My Tasks</h2>
          <form
            ref={form1}
            className={`${isAdd ? "form form-show" : "form"}`}
            onSubmit={handleSubmit}
          >
            <input
              className="input"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <IoIosArrowForward className="arrow-icon" />
          </form>
          <CgMenuRight className="burger-icon" />
        </nav>
        <section className="tasks-container">
          {tasks.length === 0 ? (
            <p className="noTask"> No more task to Do </p>
          ) : (
            tasks.map((task, index) => {
              return (
                <div key={index} className="task">
                  {" "}
                  <BsCircle className="icon" />{" "}
                  <h2 onClick={handleComplete}> {task} </h2>
                </div>
              );
            })
          )}
        </section>
        <h2 className="complete-title"> Completed </h2>
        <section className="completed-tasks-container">
          {completed.map((item, index) => {
            return (
              <div className="completed-task" key={index}>
                <BsCircleFill className="icon" /> <h2> {item} </h2>
              </div>
            );
          })}
        </section>
        <AiOutlinePlus onClick={() => setIsAdd(true)} className="add" />
      </section>
    </div>
  );
}

export default App;
