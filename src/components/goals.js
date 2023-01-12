import { useEffect, useState } from "react";
import GoalsForm from "./goalsForm";
import styles from "./goals.module.css";
import GoalsList from "./goalsList";
import { useDispatch, useSelector } from "react-redux";
import { goalAction } from "../store.js/goalsRecordSlice";
import { goalLegendAction } from "../store.js/goalLegendSlice";

const Goals = () => {
  const dispatch = useDispatch();
  const finished = useSelector((state) => state.goal.goalRecord[1].total);
  const discarded = useSelector((state) => state.goal.goalRecord[2].total);
  const pending = useSelector((state) => state.goal.goalRecord[0].total);
  const history = useSelector((state) => state.goalLegend.history);

  const getData = () => {
    const data = window.localStorage.getItem("MY_GOALS");
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const [isAdding, setIsAdding] = useState(false);
  const [goals, setGoals] = useState(getData());
  const showFormHandler = () => {
    setIsAdding(true);
  };
  const getGoals = (goal) => {
    setGoals((prevState) => [goal, ...prevState]);
    dispatch(goalAction.addPendingGoal());
  };
  const closeForm = () => {
    setIsAdding(false);
  };
  const onDelete = (filteredGoals) => {
    setGoals(filteredGoals.filtered);
    dispatch(goalAction.onCompletedGoal());
    dispatch(
      goalLegendAction.onAddHistory({
        category: "completed",
        task: filteredGoals.task,
      })
    );
  };

  useEffect(() => {
    window.localStorage.setItem("MY_GOALS", JSON.stringify(goals));
  }, [goals]);
  useEffect(() => {
    localStorage.setItem(
      "GOALRECORD",
      JSON.stringify({ pending, finished, discarded, history })
    );
  }, [pending, finished, discarded, history]);

  return (
    <div>
      {!isAdding && (
        <div className={styles.buttonContainer}>
          <button onClick={showFormHandler}>Set a goal</button>
        </div>
      )}
      {isAdding && <GoalsForm onSubmitted={getGoals} onDone={closeForm} />}
      <GoalsList goals={goals} onDelete={onDelete} />
    </div>
  );
};

export default Goals;
