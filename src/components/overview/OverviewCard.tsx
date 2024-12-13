import React from "react";

interface OverviewCardProps {
  title: string;
  value: number;
  color: string;
  textColor: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  color,
  textColor,
}) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-6 text-center border-t-4 ${color}`}
    >
      <h2 className={`text-xl font-semibold ${textColor} mb-2`}>{title}</h2>
      <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
};

export default OverviewCard;
