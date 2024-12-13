import OverviewCard from "./OverviewCard";

interface OverviewCardsProps {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({
  totalUsers,
  activeUsers,
  deletedUsers,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 shadow-md gap-6 p-10">
      <OverviewCard
        title="Total Users"
        value={totalUsers}
        color="border-blue-500"
        textColor="text-blue-600"
      />
      <OverviewCard
        title="Active Users"
        value={activeUsers}
        color="border-green-500"
        textColor="text-green-600"
      />
      <OverviewCard
        title="Deleted Users"
        value={deletedUsers}
        color="border-red-500"
        textColor="text-red-600"
      />
    </div>
  );
};

export default OverviewCards;
