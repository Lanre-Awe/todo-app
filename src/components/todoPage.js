import classes from "./todo.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import { todoActions } from "../store.js/todoRecordSlice";
import { todoLegendAction } from "../store.js/todoLegendSlice";
import Modal from "./UI/Modal";
import { categoryAction } from "../store.js/categorySlice";
import { taskAction } from "../store.js/categoryTask";
import { Link, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LoadingSpinner from "./UI/LoadingSpinner";

const TodoPage = () => {
  const dispatch = useDispatch();
  const finished = useSelector((state) => state.todo.todoRecord[1].total);
  const pending = useSelector((state) => state.todo.todoRecord[0].total);
  const history = useSelector((state) => state.todoLegend.history);
  const categoryList = useSelector((state) => state.categories.categories);
  const category = useSelector((state) => state.tasks.categoryTask);
  const todoTotal = useSelector((state) => state.todo.total);

  const inputRef = useRef();
  const params = useParams();

  const [isAdding, setIsAdding] = useState(false);
  const [availableCategory, setAvailableCategory] = useState(false);
  const [loading, setLoading] = useState(true);

  const showFormHandler = () => {
    setIsAdding(true);
  };
  const closeForm = () => {
    setIsAdding(false);
  };
  const recieveTask = (task) => {
    setIsAdding(false);
    dispatch(
      categoryAction.onAddTask({ category: category.category, tasks: task })
    );
    dispatch(taskAction.onAddTask(task));
    dispatch(todoActions.addPending());
  };
  const addingTask = () => {
    const enteredText = inputRef.current.value;
    if (enteredText.trim().length < 1) {
      return;
    }
    const task = {
      id: Math.random(),
      task: enteredText,
      description: "",
      isCompleted: false,
    };
    dispatch(
      categoryAction.onAddTask({
        category: category.category,
        tasks: task,
      })
    );
    dispatch(taskAction.onAddTask(task));
    dispatch(todoActions.addPending());
    inputRef.current.value = "";
  };
  const filteredTask = (filter, task) => {
    dispatch(
      categoryAction.onFiltered({ category: category.category, tasks: filter })
    );
    dispatch(taskAction.onfilter(filter));
    dispatch(
      todoLegendAction.onAddHistory({
        list: category.category,
        category: "completed",
        task,
      })
    );
  };
  const remainingTask = (filter) => {
    dispatch(
      categoryAction.onFiltered({
        category: category.category,
        tasks: filter.filtered,
      })
    );
    dispatch(taskAction.onfilter(filter.filtered));
    dispatch(todoActions.onCompleted());
    dispatch(
      todoLegendAction.onAddHistory({
        list: category.category,
        category: "completed",
        task: filter.task,
      })
    );
  };
  const removeHandler = (activeCategory) => {
    if (category.tasks.length > 0) {
      dispatch(
        categoryAction.onFiltered({ category: category.category, tasks: [] })
      );
      dispatch(taskAction.onfilter([]));
      dispatch(todoActions.onDiscard());
    } else {
      const remainingCategories = categoryList.filter(
        (item) => item.category !== activeCategory
      );
      dispatch(categoryAction.onfilterCategory(remainingCategories));
    }
  };
  useEffect(() => {
    localStorage.setItem("CATEGORY", JSON.stringify(categoryList));
  }, [categoryList]);
  useEffect(() => {
    const isCategory = categoryList.find(
      (item) => item.category === params.todo
    );
    setAvailableCategory(isCategory);
    setLoading(false);
    localStorage.setItem("ONSHOWCATEGORY", JSON.stringify(category));
  }, [category, params.todo]);
  useEffect(() => {
    localStorage.setItem(
      "TODORECORD",
      JSON.stringify({ pending, finished, history, todoTotal })
    );
  }, [pending, finished, history, todoTotal]);
  return (
    <>
      {loading && <LoadingSpinner />}
      {availableCategory && !loading && (
        <div>
          {isAdding && (
            <Modal onClose={closeForm}>
              <TodoForm onAdd={recieveTask} />
            </Modal>
          )}
          <div className={classes.heading}>
            <h2>{category.category}</h2>
            <button
              onClick={() => {
                removeHandler(category.category);
              }}
            >
              {category.tasks.length > 0 ? (
                "clear all"
              ) : (
                <Link to="/home">remove category</Link>
              )}
            </button>
          </div>
          {!isAdding && category.tasks.length > 0 && (
            <div className={classes.buttonContainer}>
              <h3>Tasks</h3>
              <button onClick={showFormHandler}>New Task</button>
            </div>
          )}
          {!isAdding && category.tasks.length < 1 && (
            <div className={classes.firstTask}>
              <h2>Add Your First Task</h2>
              <button onClick={showFormHandler}>New Task</button>
            </div>
          )}

          {category.tasks.length > 0 && (
            <div>
              <TodoList
                todolist={category.tasks}
                onDelete={filteredTask}
                onDone={remainingTask}
              />
            </div>
          )}
          <div className={classes.addbar}>
            <input type="text" ref={inputRef} placeholder="add task quickly" />{" "}
            <button onClick={addingTask}>add</button>
          </div>
        </div>
      )}
      {!availableCategory && !loading && <NotFound />}
    </>
  );
};

export default TodoPage;
