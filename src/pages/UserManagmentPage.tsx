import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";

import { fetchUsersThunk } from "../redux/usersSlice";
import { AppDispatch, RootState } from "../redux/store";
import UsersTable from "../components/UsersTable";
import OverviewCards from "../components/overview/OverviewCards";
import UserStatusPieChart from "../components/analytics charts/UserStatusPieChart";

const UserManagementPage = () => {
  const { users, error } = useSelector((state: RootState) => state.users);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // Create a ref to the user table section
  const userTableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  if (error) {
    console.log(error);
    return <h1>Error fetching users</h1>;
  }

  const userStatus = useSelector(
    (state: RootState) => state.filtered.userStatus
  );
  const activeUsers = userStatus.activeUser;
  const totalUsers = userStatus.totalUsers;
  const deletedUsers = 2;

  const uniqueRegions = useMemo(() => {
    if (users && users?.length) {
      return [...new Set(users?.map((user) => user.region))];
    } else {
      return [];
    }
  }, [users]);

  //region filter
  useEffect(() => {
    if (users && users?.length) {
      const userRegionFilter = users?.filter((user) =>
        user?.region?.includes(selectedRegion)
      );
      selectedRegion === "all"
        ? setFilteredUsers(users)
        : setFilteredUsers(userRegionFilter || []);
    }
  }, [selectedRegion, users]);

  //date filter
  useEffect(() => {
    if (users && users?.length && startDate && endDate) {
      const dateFilter = users?.filter(
        (user) =>
          new Date(user.created_at) >= new Date(startDate) &&
          new Date(user.created_at) <= new Date(endDate)
      );
      setFilteredUsers(dateFilter);
    }
  }, [startDate, endDate, users]);

  // Scroll to the user table when the button is clicked
  const scrollToUserTable = () => {
    userTableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header />
      <div className="w-full max-w-6xl mx-auto mt-10">
        {/* Scroll Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={scrollToUserTable}
            className="bg-purple-600 font-bold hover:scale-125 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
          >
            Go to User Table
          </button>
        </div>
        <div className="flex items-center justify-center mx-auto my-4 bg-purple-600 p-4 rounded-lg w-fit">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-white font-bold">
              Filter by Region:
            </label>
            <select
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-fit appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              defaultValue=""
            >
              <option disabled>Select a region</option>
              <option value={"all"}>All</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4">
            <label className="flex flex-col text-sm  text-white font-bold">
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </label>
            <label className="flex flex-col text-sm text-white font-bold">
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </label>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-lg font-bold text-white mb-2 bg-purple-500 shadow-lg rounded-md w-fit p-2">
              User Status
            </h1>
            <div className="flex justify-center items-center p-4 rounded-lg h-[300px] md:h-[250px]">
              <UserStatusPieChart />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white mb-2 bg-purple-500 shadow-lg rounded-md w-fit p-2">
              Overview
            </h1>
            <div className="flex flex-col justify-between h-full">
              <OverviewCards
                totalUsers={totalUsers || 0}
                activeUsers={activeUsers || 0}
                deletedUsers={deletedUsers || 0}
              />
            </div>
          </div>
        </div>

        {/* User Table below the box */}
        <div className="mt-10" ref={userTableRef}>
          <UsersTable users={filteredUsers} />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
