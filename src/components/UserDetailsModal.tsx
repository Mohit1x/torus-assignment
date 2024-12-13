import React from "react";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDetails: {
    created_at: string;
    email: string;
    name: string;
    region: string;
    status: string;
  };
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  userDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Details
        </h2>
        <div className="space-y-4">
          <div>
            <strong className="text-gray-700">Name:</strong>
            <p className="text-gray-600">{userDetails.name}</p>
          </div>
          <div>
            <strong className="text-gray-700">Email:</strong>
            <p className="text-gray-600">{userDetails.email}</p>
          </div>
          <div>
            <strong className="text-gray-700">Region:</strong>
            <p className="text-gray-600">{userDetails.region}</p>
          </div>
          <div>
            <strong className="text-gray-700">Status:</strong>
            <p className="text-gray-600">{userDetails.status}</p>
          </div>
          <div>
            <strong className="text-gray-700">Created At:</strong>
            <p className="text-gray-600">{userDetails.created_at}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
