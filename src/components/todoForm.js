import { useRef } from "react";
import classes from "./todo.module.css";

const TodoForm = (props) => {
  const inputRef = useRef();
  const descRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredTask = inputRef.current.value;
    const enteredDesc = descRef.current.value;
    props.onAdd({
      id: Math.random(),
      task: enteredTask,
      description: enteredDesc,
      isCompleted: false,
    });
    inputRef.current.value = "";
    descRef.current.value = "";
  };
  return (
    <div className={classes.formContainer}>
      <form onSubmit={submitHandler}>
        <div className={classes.labelContainer}>
          <label htmlFor="task">Task</label>
        </div>
        <div className={classes.inputContainer}>
          <input type="text" id="task" ref={inputRef} required />
        </div>
        <div className={classes.labelContainer}>
          <label htmlFor="description">Description</label>
        </div>
        <div className={classes.inputContainer}>
          <input type="text" id="description" ref={descRef} required />
        </div>
        <div className={classes.buttonContainerMain}>
          <button>Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
