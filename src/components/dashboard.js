import DoughnutChart from "./doughnut-chart";
import classes from "./dashboard.module.css";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";

const Dashboard = () => {
  const [history, setHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [goalHistoryRecord, setGoalHistoryRecord] = useState(false);
  const [showGoalHistory, setShowGoalHistory] = useState(false);
  const todoData = useSelector((state) => state.todo.todoRecord);
  const goalData = useSelector((state) => state.goal.goalRecord);
  const todoHistory = useSelector((state) => state.todoLegend.history);
  const goalHistory = useSelector((state) => state.goalLegend.history);

  const displayTodoLegendInformation = (info) => {
    const history = todoHistory.filter((item) => item.category === info);
    if (history.length > 0) {
      setShowHistory(true);
      setHistory(history);
    }
  };
  const displayGoalLegendInformation = (info) => {
    const history = goalHistory.filter((item) => item.category === info);
    console.log(history);
    if (history.length > 0) {
      setShowGoalHistory(true);
      setGoalHistoryRecord(history);
    }
  };

  const closeHandler = () => {
    setShowHistory(false);
  };
  const closeGoalHandler = () => {
    setShowGoalHistory(false);
  };
  const [numberData, setNumberData] = useState({
    labels: todoData.map((item) => item.id),
    datasets: [
      {
        label: "",
        data: todoData.map((item) => item.total),
      },
    ],
  });
  const [goalNumberData, setGoalNumberData] = useState({
    labels: goalData.map((item) => item.id),
    datasets: [
      {
        label: "",
        data: goalData.map((item) => item.total),
      },
    ],
  });
  return (
    <Carousel showThumbs={false} showStatus={false}>
      <div className={classes.todo}>
        <h2>Todo history</h2>
        {showHistory && (
          <div className={classes.recentContainer}>
            {history.map((item) => {
              return <div className={classes.recent}>{item.task.task}</div>;
            })}
            <div className={classes.buttonContainer}>
              <button className={classes.recentButton} onClick={closeHandler}>
                close
              </button>
            </div>
          </div>
        )}
        {!showHistory && (
          <DoughnutChart
            dummyData={numberData}
            onShow={displayTodoLegendInformation}
          />
        )}
      </div>
      <div className={classes.todo}>
        <h2>Goal History</h2>
        {showGoalHistory && (
          <div className={classes.recentContainer}>
            {goalHistoryRecord.map((item) => {
              return (
                <div className={classes.recent}>
                  {item.task.goal} <p>{item.task.description}</p>
                </div>
              );
            })}
            <div className={classes.buttonContainer}>
              <button
                className={classes.recentButton}
                onClick={closeGoalHandler}
              >
                close
              </button>
            </div>
          </div>
        )}
        {!showGoalHistory && (
          <DoughnutChart
            dummyData={goalNumberData}
            onShow={displayGoalLegendInformation}
          />
        )}
      </div>
    </Carousel>
  );
};

export default Dashboard;
