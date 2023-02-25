import { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Backdrop } from "../UI/Modal";
import classes from "./phonemenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sideAction } from "../../store.js/sideSlice";
import { categoryAction } from "../../store.js/categorySlice";
import { taskAction } from "../../store.js/categoryTask";
import { Link, NavLink } from "react-router-dom";
const Menu = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const categoryList = useSelector((state) => state.categories.categories);
  const closeModal = () => {
    dispatch(sideAction.control());
  };

  const addNewCategory = () => {
    setShowForm((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const enteredCategory = inputRef.current.value;
    if (enteredCategory.trim().length === 0) {
      setShowForm(false);
      return;
    }
    dispatch(categoryAction.onAdd({ category: enteredCategory, tasks: [] }));
    setShowForm(false);
  };
  const closeside = () => {
    dispatch(sideAction.control());
  };
  const getCategory = (categoryName) => {
    const filteredCategory = categoryList.find(
      (item) => item.category === categoryName
    );
    console.log(filteredCategory);
    dispatch(taskAction.onAdd(filteredCategory));
    dispatch(sideAction.control());
  };
  useEffect(() => {
    localStorage.setItem("CATEGORY", JSON.stringify(categoryList));
  }, [categoryList]);
  return (
    <>
      <div className={classes.categoryContainer}>
        <div className={classes.heading}>
          <span>YOUR TODO</span>
          <button onClick={closeModal} className={classes.buttonContainer}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
              className={classes.icons}
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
        </div>
        <div className={classes.container}>
          <div className={classes.heading} onClick={closeside}>
            <Link to="/home">HOME</Link>
          </div>
          <div className={classes.list}>
            <span className={classes.head}>
              MY LIST
              <button onClick={addNewCategory}>{!showForm ? "+" : "x"}</button>
            </span>
            {showForm && (
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  ref={inputRef}
                  placeholder="add new category"
                />
                <button type="submit">↓</button>
              </form>
            )}
          </div>
          <div className={classes.listContainer}>
            {categoryList.map((category) => {
              return (
                <NavLink
                  to={`/${category.category}`}
                  key={category.category}
                  activeClassName={classes.active}
                >
                  <div onClick={() => getCategory(category.category)}>
                    {category.category}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className={classes.footer}>©your todo 2023</div>
      </div>
    </>
  );
};
const PhoneMenu = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("overlays"))}
      {ReactDOM.createPortal(<Menu />, document.getElementById("overlays"))}
    </Fragment>
  );
};

export default PhoneMenu;
