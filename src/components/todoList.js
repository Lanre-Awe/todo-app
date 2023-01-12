import { useEffect, useState } from "react";
import classes from "./todo.module.css";

const TodoList = (props) => {
  const [completed, setCompleted] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const deleteHandler = (id, event) => {
    const listItem = event.target.parentElement.classList;
    listItem.add(`${classes.unlist}`);
    const task = props.todolist.find((item) => item.id === id);
    const filteredTask = props.todolist.filter((item) => item.id !== id);
    props.onDelete(filteredTask, task);
  };

  const finishedHandler = (id, event) => {
    const listItem = event.target.parentElement.firstChild.classList;
    listItem.add(`${classes.done}`);
    const todo = event.target.parentElement.classList;
    todo.add(`${classes.completed}`);
    const task = props.todolist.find((item) => item.id === id);
    const filteredTask = props.todolist.filter((item) => item.id !== id);
    setFiltered({ filtered: filteredTask, task: task });
    setCompleted(true);
  };
  useEffect(() => {
    if (completed) {
      setIsCompleted(true);
      setTimeout(() => {
        props.onDone(filtered);
        setIsCompleted(false);
      }, 2000);
    }

    setCompleted(false);
  }, [completed]);
  return (
    <ul>
      {props.todolist.map((item) => {
        return (
          <li key={item.id} className={classes.list}>
            <div className={classes.task}>{item.task}</div>
            <div className={classes.status}>
              {isCompleted ? "completed" : "pending"}
            </div>
            <button
              className={classes.cancel}
              onClick={deleteHandler.bind(this, item.id)}
            >
              Clear
            </button>
            <button
              className={classes.finished}
              onClick={finishedHandler.bind(this, item.id)}
            >
              done
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
