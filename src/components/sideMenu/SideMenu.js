import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { categoryAction } from "../../store.js/categorySlice";
import { taskAction } from "../../store.js/categoryTask";
import classes from "./sidemenu.module.css";

const SideMenu = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const categoryList = useSelector((state) => state.categories.categories);

  const addNewCategory = () => {
    setShowForm((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const enteredCategory = inputRef.current.value;
    if (enteredCategory.trim().length === 0) {
      setShowForm(false);
      console.log("nada");
      return;
    }
    dispatch(categoryAction.onAdd({ category: enteredCategory, tasks: [] }));
    setShowForm(false);
  };

  const getCategory = (categoryName) => {
    const filteredCategory = categoryList.find(
      (item) => item.category === categoryName
    );
    console.log(filteredCategory);
    dispatch(taskAction.onAdd(filteredCategory));
  };
  useEffect(() => {
    localStorage.setItem("CATEGORY", JSON.stringify(categoryList));
  }, [categoryList]);
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <Link to="/home">HOME</Link>
      </div>
      <div className={classes.list}>
        <span className={classes.heading}>
          MY LIST{" "}
          <button onClick={addNewCategory}>{!showForm ? "+" : "x"}</button>
        </span>
        {showForm && (
          <form onSubmit={onSubmit}>
            <input type="text" ref={inputRef} placeholder="add new category" />
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
  );
};

export default SideMenu;
