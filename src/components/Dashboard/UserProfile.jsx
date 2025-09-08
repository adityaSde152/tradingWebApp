import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    id: "USR001",
    fullName: "Rahul Sharma",
    username: "rahul_sharma95",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    dob: "1995-05-20",
    gender: "Male",
    country: "India",
    currency: "INR",
    password: "hashed_password_123",
    referralCode: "REF-RAHUL95",
    createdAt: "2025-09-01",
    status: "Active",
  });
  return (
    <div className="col-span-3 lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-sm border w-full">
      <div className="flex flex-row lg:flex-col gap-4">
        {/* Avatar + Status */}
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="profile"
            className="w-44 h-44 rounded-lg object-cover mb-4"
          />
          <span className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full mb-4">
            {user.status}
          </span>
        </div>

        {/* User Info */}
        <div className="text-md text-gray-400 space-y-2 grid sm:grid-cols-1 md:grid-cols-2 lg:flex flex-col pl-2 w-full overflow-hidden">
          <p className="flex flex-col truncate">
            <span className="font-medium text-white">Fullname</span>
            <span className="truncate">{user.fullName}</span>
          </p>
          <p className="flex flex-col truncate">
            <span className="font-medium text-white">Username</span>
            <span className="truncate">{user.username}</span>
          </p>
          <p className="flex flex-col truncate">
            <span className="font-medium text-white">Email</span>
            <span className="truncate">{user.email}</span>
          </p>
          <p className="flex flex-col truncate">
            <span className="font-medium text-white">Date of birth</span>
            <span>{user.dob}</span>
          </p>
          <p className="flex flex-col truncate">
            <span className="font-medium text-white">Country</span>
            <span className="truncate">{user.country}</span>
          </p>
          <p className="flex flex-col truncate">
            <span className="font-medium text-white">Currency</span>
            <span className="truncate">{user.currency}</span>
          </p>
          <p className="flex flex-col truncate">
            <span className="font-medium text-white">Referral Code</span>
            <span className="truncate">{user.referralCode}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
