import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import useSidebar from "../hooks/useSidebar";

const Home: React.FC = () => {
  const {
    isSidebarOpen,
    apiData,
    loading,
    error,
    handleSidebarOpen,
    handleSidebarClose,
  } = useSidebar();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Link
        to="#"
        onClick={handleSidebarOpen}
        className="px-6 py-3 text-lg text-white bg-[#1CA7D6] rounded transition duration-300 hover:bg-[#1694C0] focus:outline-none focus:ring-2 focus:ring-blue-300"
        style={{ textDecoration: "none" }}
      >
        Explore Web APIs
      </Link>
      {loading && <p className="mt-4 text-yellow-300">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        data={apiData}
      />
    </div>
  );
};

export default Home;
