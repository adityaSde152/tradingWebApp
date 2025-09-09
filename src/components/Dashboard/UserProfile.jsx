import React, { useState } from "react";

const UserProfile = ({ user, setUser, isEditing, setIsEditing }) => {
  const [formData, setFormData] = useState(user);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };
  console.log(formData);
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

      {/* Modal for Editing */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleOnSubmit} className="space-y-3">
              {/* Full Name */}
              <div className="flex flex-col">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleOnChange}
                  placeholder="Full Name"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              {/* Username */}
              {/* <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleOnChange}
                  placeholder="Username"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div> */}

              {/* Email */}
              {/* <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="example@gmail.com"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div> */}

              {/* Phone No. */}
              {/* <div className="flex flex-col">
                <label htmlFor="phone">Phone No.</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleOnChange}
                  placeholder="+91 9876543210"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div> */}

              {/* Date of Birth */}
              {/* <div className="flex flex-col">
                <label htmlFor="phone">Date of birth</label>
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleOnChange}
                  placeholder="12/05/2025"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div> */}

              {/* Gender */}
              {/* <div className="flex flex-col">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleOnChange}
                  placeholder="Male"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div> */}

              {/* Country */}
              {/* <div className="flex flex-col">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleOnChange}
                  placeholder="India"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div> */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full py-2 bg-dark border border-gray-400 hover:bg-dark/50 rounded-md font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button className="w-full py-2 bg-green hover:bg-green/90 rounded-md font-semibold cursor-pointer">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
