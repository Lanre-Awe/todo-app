import DoughnutChart from "./doughnut-chart";
import classes from "./dashboard.module.css";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";

const Dashboard = () => {
  const [history, setHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const todoData = useSelector((state) => state.todo.todoRecord);
  const todoTotal = useSelector((state) => state.todo.total);
  const todoHistory = useSelector((state) => state.todoLegend.history);

  const [numberData, setNumberData] = useState({
    labels: todoData.map((item) => item.id),
    datasets: [
      {
        label: "",
        data: todoData.map((item) => item.total),
      },
    ],
  });
  useEffect(() => {
    setNumberData({
      labels: todoData.map((item) => item.id),
      datasets: [
        {
          label: "",
          data: todoData.map((item) => item.total),
        },
      ],
    });
  }, [todoData]);
  const displayTodoLegendInformation = (info) => {
    const history = todoHistory.filter((item) => item.category === info);
    if (history.length > 0) {
      setShowHistory(true);
      setHistory(history);
    }
  };

  const closeHandler = () => {
    setShowHistory(false);
  };

  const noRecord = <div className={classes.record}>NO RECORD</div>;
  return (
    <Carousel showThumbs={false} showStatus={false} showIndicators={false}>
      <div className={classes.todo}>
        <h2>Todo history</h2>
        {showHistory && (
          <div className={classes.recentContainer}>
            {history.map((item) => {
              return (
                <div className={classes.recent}>
                  <span>{item.list}</span> <div>{item.task.task}</div>
                </div>
              );
            })}
            <div className={classes.buttonContainer}>
              <button className={classes.recentButton} onClick={closeHandler}>
                close
              </button>
            </div>
          </div>
        )}
        {!showHistory && todoTotal > 0 ? (
          <DoughnutChart
            dummyData={numberData}
            onShow={displayTodoLegendInformation}
          />
        ) : !showHistory && todoTotal < 1 ? (
          noRecord
        ) : (
          ""
        )}
      </div>
    </Carousel>
  );
};

export default Dashboard;
