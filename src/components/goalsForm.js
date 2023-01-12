import { useRef, useState } from "react";
import classes from "./goals.module.css";
import GoalsTimer from "./goalsTimer";

const GoalsForm = (props) => {
  const [time, setTime] = useState();
  const goalInputRef = useRef();
  const descriptionInputRef = useRef();

  const durationHandler = (duration) => {
    const timer = duration.slice(0, 15);
    setTime(timer);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredGoal = goalInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    props.onSubmitted({
      id: Math.random(),
      description: enteredDescription,
      goal: enteredGoal,
      duration: time ? time : "today",
    });
    props.onDone();
  };
  return (
    <div className={classes.formContainer}>
      <form onSubmit={submitHandler}>
        <div className={classes.userInput}>
          <input
            type="text"
            id="goal"
            required
            name="goal"
            ref={goalInputRef}
          />
          <label htmlFor="goal">Goal</label>
        </div>

        <div className={classes.userInput}>
          <input
            type="text"
            id="description"
            required=" "
            ref={descriptionInputRef}
          />
          <label htmlFor="description">description</label>
        </div>

        <GoalsTimer onSelect={durationHandler} />
        <button className={classes.submitButton}> Add new goal</button>
      </form>
    </div>
  );
};

export default GoalsForm;
