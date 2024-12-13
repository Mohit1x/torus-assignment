import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { RootState, useAppSelector } from "../../redux/store";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserStatusPieChart = () => {
  const userStatus = useAppSelector(
    (state: RootState) => state.filtered.userStatus
  );
  const activeUsers = userStatus.activeUser;
  const inActiveUsers = userStatus.inActiveUser;
  const chartData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        label: "User Status",
        data: [activeUsers, inActiveUsers],
        backgroundColor: ["#4caf50", "#f44336"], // Green for active, red for inactive
        borderColor: ["#388e3c", "#d32f2f"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    // Make the chart take 100% width and scale height based on container
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full max-h-[250px] md:max-h-[300px] p-4 bg-white rounded-lg shadow-md flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UserStatusPieChart;
