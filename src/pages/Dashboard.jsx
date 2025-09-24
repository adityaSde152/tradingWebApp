import StatsCard from "../components/Dashboard/StatsCard";
import CardDetails from "../components/Dashboard/CardDetails";
import UserProfile from "../components/Dashboard/UserProfile";
import TransactionDetails from "../components/Dashboard/TransactionDetails";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, setUser, isLoading, setIsLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex h-screen bg-dark">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 text-white">
          <h2 className="md:text-2xl font-semibold">Your profile</h2>
          <div className="flex gap-2">
            <button className="md:px-4 px-2 py-2  sm:py-2 border rounded-lg text-xs  sm:text-sm font-medium hover:bg-green duration-300 cursor-pointer">
              Change password
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="md:px-4 px-2 py-2  sm:py-2 border rounded-lg text-xs  sm:text-sm font-medium hover:bg-green duration-300 cursor-pointer"
            >
              Edit profile
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Profile */}
          <UserProfile
            user={user}
            setUser={setUser}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          <div className="col-span-3 space-y-6">
            <StatsCard />

            {/* Card Details */}
            <CardDetails />

            {/* Transaction Details */}
            <TransactionDetails />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
