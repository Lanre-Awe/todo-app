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
              color: "#fff",
              padding: 8,
              usePointStyle: true,
            },
            position: "left",
            onClick: handleClick,
          },
        },
        layout: {
          padding: {
            left: 20,
            right: 50,
            top: 2,
            bottom: 2,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
