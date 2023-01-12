import { useRef, useState } from "react";
import classes from "./todo.module.css";

const TodoForm = (props) => {
  const [noInput, setNoInput] = useState(false);
  const inputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredTask = inputRef.current.value;
    if (enteredTask.length < 1) {
      setNoInput(true);
      return;
    }
    props.onAdd({
      id: Math.random(),
      task: enteredTask,
      isCompleted: false,
    });
    inputRef.current.value = "";
  };
  return (
    <div className={classes.formContainer}>
      <form onSubmit={submitHandler}>
        <div className={classes.labelContainer}>
          <label htmlFor="task">Task</label>
        </div>
        <div className={classes.inputContainer}>
          <input type="text" id="task" ref={inputRef} required />
          {noInput && <span> please enter a task</span>}
        </div>
        <div className={classes.buttonContainerMain}>
          <button>Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
