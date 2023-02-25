import { useRef, useState } from "react";
import style from "./todo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { descriptionAction } from "../store.js/descriptionSlice";
import classes from "./frontpage.module.css";
import Modal from "./UI/Modal";
import { categoryAction } from "../store.js/categorySlice";
import { todoActions } from "../store.js/todoRecordSlice";
import { taskAction } from "../store.js/categoryTask";
import { sideAction } from "../store.js/sideSlice";

const FrontPage = () => {
  const getName = () => {
    const data = localStorage.getItem("username");
    if (data) {
      return data;
    } else {
      return "";
    }
  };
  const categoryList = useSelector((state) => state.categories.categories);
  const [editing, setEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState(getName());
  const dispatch = useDispatch();

  const setUserName = (event) => {
    const nameValue = event.target.value;
    setName(nameValue);
    if (nameValue.trim().length > 0) {
      setEditing(true);
    }
  };
  const addUserName = () => {
    setEditing(false);
    localStorage.setItem("username", name);
  };
  const showDescription = (desc) => {
    dispatch(descriptionAction.onDisplay(desc));
  };
  const closeDescription = () => {
    dispatch(descriptionAction.onDisplay(null));
  };

  const addCategory = () => {
    setIsAdding(true);
  };
  const inputRef = useRef();
  const descRef = useRef();
  const taskRef = useRef();
  const submitHandler = () => {
    const category = inputRef.current.value;
    const description = descRef.current.value;
    const task = taskRef.current.value;
    dispatch(
      categoryAction.onAdd({
        category: category,
        tasks: [{ id: Math.random(), task: task, description: description }],
      })
    );
    dispatch(todoActions.addPending());

    setIsAdding(false);
  };
  const getCategory = (categoryName) => {
    const filteredCategory = categoryList.find(
      (item) => item.category === categoryName
    );
    console.log(filteredCategory);
    dispatch(taskAction.onAdd(filteredCategory));
  };
  const closeForm = () => {
    setIsAdding(false);
  };

  const form = (
    <div className={style.formContainer}>
      <form onSubmit={submitHandler}>
        <div className={style.labelContainer}>
          <label htmlFor="category">Category</label>
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            id="category"
            ref={inputRef}
            required
            placeholder="personal, work, fun"
          />
        </div>
        <div className={style.labelContainer}>
          <label htmlFor="Task">Task</label>
        </div>
        <div className={style.inputContainer}>
          <input type="text" id="Task" ref={taskRef} required />
        </div>
        <div className={style.labelContainer}>
          <label htmlFor="description">Description</label>
        </div>
        <div className={style.inputContainer}>
          <input type="text" id="description" ref={descRef} required />
        </div>
        <div className={style.buttonContainerMain}>
          <button>Add New Category</button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {isAdding && <Modal onClose={closeForm}>{form}</Modal>}
      <div className={classes.headingContainer}>
        <div className={classes.title}>YOUR TODO</div>
        <div className={classes.nameContainer}>
          <span>HI,</span>
          <input
            type="text"
            onChange={setUserName}
            placeholder="add a username"
            maxLength={15}
            value={name}
          />
          {editing && <button onClick={addUserName}>Add</button>}
        </div>
        {categoryList.length > 0 && (
          <div className={classes.latest}>
            <div className={classes.latestHeader}>Latest Tasks</div>
            <div className={classes.latestTask}>
              {categoryList.map((item) => {
                return (
                  <div
                    key={item.category}
                    className={classes.taskContainer}
                    onMouseOver={() => {
                      item.tasks[item.tasks.length - 1].description
                        ? showDescription(
                            item.tasks[item.tasks.length - 1].description
                          )
                        : showDescription("");
                    }}
                    onMouseLeave={closeDescription}
                  >
                    <Link
                      to={`/${item.category}`}
                      onClick={() => getCategory(item.category)}
                    >
                      <div className={classes.category}>{item.category}</div>
                      <div className={classes.task}>
                        {item.tasks.length > 0
                          ? item.tasks[item.tasks.length - 1].task
                          : "no recent task"}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {categoryList.length < 1 && (
          <div className={classes.newCategory}>
            <div>add task category</div>
            <button onClick={addCategory}>Add</button>
          </div>
        )}
      </div>
      <div className={classes.footer}>©your todo 2023</div>
    </>
  );
};

export default FrontPage;
