import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions, // Import ChartOptions type
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type UserRegistrationsChartProps = {
  data: {
    month?: string;
    users_registered?: number;
  }[];
};

const UserRegistrationsChart: React.FC<UserRegistrationsChartProps> = ({
  data,
}) => {
  const chartData = {
    labels: data.map((entry) => entry.month),
    datasets: [
      {
        label: "User Registrations",
        data: data.map((entry) => entry.users_registered),
        borderColor: "#3b82f6", // Tailwind blue-500
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    // Use the ChartOptions type here
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb", // Tailwind gray-300
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        User Registrations
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default UserRegistrationsChart;
