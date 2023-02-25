import { Fragment, useEffect, useState } from "react";
import classes from "./todo.module.css";
import close from "./close.png";
import { useDispatch, useSelector } from "react-redux";
import { descriptionAction } from "../store.js/descriptionSlice";

const TodoList = (props) => {
  const [completed, setCompleted] = useState(false);
  const [listIndex, setListIndex] = useState();
  const [completedList, setCompletedList] = useState();
  const [filtered, setFiltered] = useState([]);
  const description = useSelector((state) => state.description.description);

  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    const task = props.todolist.find((item) => item.id === id);
    const filteredTask = props.todolist.filter((item) => item.id !== id);
    props.onDelete(filteredTask, task);
  };

  const finishedHandler = (id) => {
    setCompletedList(id);
    const task = props.todolist.find((item) => item.id === id);
    const filteredTask = props.todolist.filter((item) => item.id !== id);
    setFiltered({ filtered: filteredTask, task: task });
    setCompleted(true);
  };

  const showDescription = (desc, index) => {
    dispatch(descriptionAction.onDisplay(desc));
    setListIndex(index);
  };
  const closeDescription = () => {
    dispatch(descriptionAction.onDisplay(null));
    setListIndex("");
  };
  useEffect(() => {
    if (completed) {
      setTimeout(() => {
        props.onDone(filtered);
      }, 1000);
    }
    setCompleted(false);
  }, [completed]);
  return (
    <ul className={classes.listContainer}>
      {props.todolist.map((item, index) => {
        return (
          <Fragment key={item.id}>
            <li
              className={
                completedList === item.id
                  ? `${classes.list} ${classes.completed}`
                  : classes.list
              }
              onMouseOver={() => showDescription(item.description)}
              onMouseLeave={closeDescription}
            >
              <button
                className={
                  completedList === item.id
                    ? `${classes.finished} ${classes.done}`
                    : classes.finished
                }
                onClick={() => finishedHandler(item.id)}
              ></button>
              <div
                className={classes.task}
                onClick={() => showDescription(item.description, item.id)}
              >
                {item.task}
              </div>
              <img
                src={close}
                className={
                  completedList === item.id ? classes.show : classes.cancel
                }
                onClick={deleteHandler.bind(this, item.id)}
              />
            </li>
            {listIndex === item.id && (
              <div className={classes.description}>
                <span> {description ? description : "No description"}</span>
                <img
                  src={close}
                  className={classes.close}
                  onClick={closeDescription}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default TodoList;
