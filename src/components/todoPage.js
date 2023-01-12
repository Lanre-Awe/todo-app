import classes from "./todo.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import { todoActions } from "../store.js/todoRecordSlice";
import { todoLegendAction } from "../store.js/todoLegendSlice";

const TodoPage = () => {
  const dispatch = useDispatch();
  const finished = useSelector((state) => state.todo.todoRecord[1].total);
  const discarded = useSelector((state) => state.todo.todoRecord[2].total);
  const pending = useSelector((state) => state.todo.todoRecord[0].total);
  const history = useSelector((state) => state.todoLegend.history);
  const getData = () => {
    const data = localStorage.getItem("MY_TODO");
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [isAdding, setIsAdding] = useState(false);
  const [tasks, setTasks] = useState(getData());

  const showFormHandler = () => {
    setIsAdding(true);
  };
  const recieveTask = (task) => {
    setIsAdding(false);
    setTasks((prevState) => [task, ...prevState]);
    dispatch(todoActions.addPending());
  };
  const filteredTask = (filter, task) => {
    setTasks(filter);
    dispatch(todoActions.onDiscard());
    dispatch(todoLegendAction.onAddHistory({ category: "discarded", task }));
  };
  const remainingTask = (filter) => {
    setTasks(filter.filtered);
    dispatch(todoActions.onCompleted());
    dispatch(
      todoLegendAction.onAddHistory({
        category: "completed",
        task: filter.task,
      })
    );
  };
  useEffect(() => {
    localStorage.setItem("MY_TODO", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "TODORECORD",
      JSON.stringify({ pending, finished, discarded, history })
    );
  }, [pending, finished, discarded, history]);
  return (
    <>
      {!isAdding && (
        <div className={classes.buttonContainer}>
          <button onClick={showFormHandler}>New Task</button>
        </div>
      )}
      {isAdding && (
        <div>
          <TodoForm onAdd={recieveTask} />
        </div>
      )}
      <div>
        <TodoList
          todolist={tasks}
          onDelete={filteredTask}
          onDone={remainingTask}
        />
      </div>
    </>
  );
};

export default TodoPage;
