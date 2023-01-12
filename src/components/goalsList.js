import { useEffect, useState } from "react";
import classes from "./goals.module.css";

const GoalsList = (props) => {
  const [newGoals, setnewGoals] = useState([]);
  const [completed, setCompleted] = useState(false);
  const finishedHandler = (id, event) => {
    const listItem = event.target.parentElement.classList;
    listItem.add(`${classes.done}`);
    const children = event.target.parentElement.children;
    const button = children.item(3).classList;
    button.add(`${classes.done}`);

    const filtered = props.goals.filter((item) => item.id !== id);
    const task = props.goals.find((item) => item.id === id);
    console.log(task);
    setnewGoals({ filtered: filtered, task: task });
    setCompleted(true);
  };

  useEffect(() => {
    if (completed) {
      setTimeout(() => {
        props.onDelete(newGoals);
      }, 3000);
    }

    setCompleted(false);
  }, [completed]);
  return (
    <ul>
      {props.goals.map((item) => {
        return (
          <li key={item.id} className={classes.goalList}>
            <div className={classes.goal}>{item.goal}</div>
            <div className={classes.description}>{item.description}</div>
            <div className={classes.duration}>{item.duration}</div>
            <button
              className={classes.actionButton}
              onClick={finishedHandler.bind(this, item.id)}
            >
              Done
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default GoalsList;
