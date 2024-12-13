// BarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Record<string, number>;
}

const UserRegionChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "User Distribution by Region",
        data: Object.values(data),
        backgroundColor: "#4e73df",
        borderColor: "#4e73df",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} users`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        ticks: {
          maxRotation: 0, // Set the rotation of x-axis labels to 0 for horizontal display
          minRotation: 0,
          font: {
            size: 10, // Reduce the font size for better label fit
          },
        },
        grid: {
          display: false, // Hide the x-axis grid to free up space
        },
        offset: true, // Ensure there's some spacing between the axis and labels
      },
    },
    layout: {
      padding: {
        left: 10, // Add some padding on the left side
        right: 10, // Add some padding on the right side
        top: 20, // Add some padding on the top
        bottom: 40, // Increase bottom padding to prevent label cutoff
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        User Distribution by Region
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default UserRegionChart;
