import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { User } from "../types";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { deleteUserThunk } from "../redux/deleteUserSlice";
import { fetchUsersThunk } from "../redux/usersSlice";
import UserDetailsModal from "./UserDetailsModal";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import {
  setActiveUser,
  setInActiveUser,
  setTotalUser,
} from "../redux/userFilteredValueSlice";
import { toast } from "sonner";

interface UserTableProps {
  users: User[] | null;
}

const UsersTable: React.FC<UserTableProps> = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUser, setFilteredUser] = useState<User[]>(users || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useLayoutEffect(() => {
    setFilteredUser(users || []);
  }, [users]);

  const { isLoading } = useAppSelector((state: RootState) => state.deleteUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filteredUser.length) {
      const noOfActiveUsers = filteredUser?.filter(
        (user) => user?.status === "active"
      );
      const noOfInActiveUsers = filteredUser?.filter(
        (user) => user?.status === "inactive"
      );
      dispatch(setActiveUser(noOfActiveUsers.length));
      dispatch(setInActiveUser(noOfInActiveUsers.length));
      dispatch(setTotalUser(filteredUser.length));
    }
  }, [filteredUser]);

  const handleFilteredUsers = () => {
    const filtered = users?.filter(
      (user) =>
        user?.name
          ?.toLocaleLowerCase()
          ?.includes(searchValue.toLocaleLowerCase()) ||
        user?.email
          ?.toLocaleLowerCase()
          ?.includes(searchValue.toLocaleLowerCase())
    );
    setFilteredUser(filtered || []);
    setCurrentPage(1);
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUserThunk({ id }));
    if (!isLoading) {
      setTimeout(() => {
        dispatch(fetchUsersThunk());
        setFilteredUser(users || []);
        toast.success("user deleted!");
      }, 500);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentPageUsers = useMemo(() => {
    return filteredUser?.length
      ? filteredUser?.slice(startIndex, startIndex + itemsPerPage)
      : [];
  }, [filteredUser, currentPage]);

  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <div className="flex items-center mx-auto my-5 gap-2 py-4 px-4 bg-purple-500 w-fit rounded-lg">
        <input
          className="focus:outline-none w-fit bg-purple-500 placeholder:text-white placeholder:text-semibold font-semibold text-white"
          type="text"
          placeholder="Enter name or email"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          onClick={handleFilteredUsers}
          className="text-white font-bold text-xl transition duration-200 hover:scale-125"
        >
          <FaSearch />
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left bg-purple-600">
            <th className="px-6 py-3 text-sm font-semibold text-white">
              Username
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-white">
              Email
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-white">
              Region
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-white">
              Actions
            </th>
          </tr>
        </thead>
        {currentPageUsers.length > 0 ? (
          <tbody>
            {currentPageUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-purple-100">
                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.region}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="text-blue-600 hover:text-blue-800 mr-4 text-xl"
                  >
                    <TbListDetails />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 text-xl"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <h1 className="p-10 text-center font-bold text-red-400">
            No data found, please reset your filter and try again!
          </h1>
        )}
      </table>

      {currentPageUsers.length > 0 && (
        <div className="flex justify-between items-center p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-purple-500 hover:bg-purple-700"
            } text-white`}
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-purple-500 hover:bg-purple-700"
            } text-white`}
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && selectedUser && (
        <UserDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userDetails={selectedUser}
        />
      )}
    </div>
  );
};

export default UsersTable;
