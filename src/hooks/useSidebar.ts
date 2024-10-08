import { useState } from "react";
import { apiClient } from "../utils/apiClient";

const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSidebarOpen = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/providers.json");

      setApiData(response.data.data);
      setIsSidebarOpen(true);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return {
    isSidebarOpen,
    apiData,
    loading,
    error,
    handleSidebarOpen,
    handleSidebarClose,
  };
};

export default useSidebar;
