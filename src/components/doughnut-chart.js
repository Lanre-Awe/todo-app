import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Legend } from "chart.js/auto";

const DoughnutChart = (props) => {
  const handleClick = (legend, item) => {
    props.onShow(item.text);
  };
  return (
    <Doughnut
      data={props.dummyData}
      options={{
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgb(2,2,130)",
              padding: 8,
              usePointStyle: true,
            },
            position: "left",
            onClick: handleClick,
          },
        },
        layout: {
          padding: {
            left: 5,
            right: 10,
            top: 1,
            bottom: 1,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
