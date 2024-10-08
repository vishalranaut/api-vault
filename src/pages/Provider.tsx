import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import useSidebar from "../hooks/useSidebar";
import { apiClient } from "../utils/apiClient";

interface Contact {
  email: string;
  name: string;
  url: string;
  "x-twitter"?: string;
}

interface ApiInfo {
  contact: Contact;
  description: string;
  title: string;
  version: string;
  "x-apisguru-categories": string[];
  "x-logo": { url: string };
  "x-origin": { format: string; url: string; version: string }[];
  "x-providerName": string;
  "x-serviceName": string;
  "x-unofficialSpec": boolean;
}

interface Api {
  added: string;
  info: ApiInfo;
  updated: string;
  swaggerUrl: string;
  swaggerYamlUrl: string;
  openapiVer: string;
  link: string;
}

interface ProviderData {
  apis: Record<string, Api>;
}

const Provider: React.FC = () => {
  const { state } = useLocation();
  const provider = state?.provider;

  const {
    isSidebarOpen,
    apiData,
    loading,
    error,
    handleSidebarOpen,
    handleSidebarClose,
  } = useSidebar();
  const [ProviderData, setProviderData] = useState<ProviderData | null>(null);
  const providerDataRef = useRef<ProviderData | null>(null);

  const handleProvider = async () => {
    if (!provider) return;

    try {
      const response = await apiClient.get(`/${provider}.json`);

      setProviderData(response.data);
      providerDataRef.current = response.data;
    } catch (err) {}
  };

  useEffect(() => {
    if (provider) {
      handleProvider();
    }
  }, [provider]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {providerDataRef.current?.apis ? (
        <div className="mt-6 space-y-4">
          {Object.keys(providerDataRef.current.apis).map((key) => {
            const api = providerDataRef.current!.apis[key];
            return (
              <div
                key={key}
                className=" p-6 rounded-lg  transition-transform transform hover:scale-105 w-[80rem]"
              >
                <div className="flex items-center mb-2">
                  {api.info["x-logo"] && (
                    <img
                      src={api.info["x-logo"].url}
                      alt={api.info.title}
                      className="h-16 w-16 mr-4"
                    />
                  )}
                  <h2 className="text-2xl font-bold">{api.info.title}</h2>
                </div>
                <h3 className="text-lg font-semibold mt-4">Description</h3>
                <p className="mt-2 text-gray-300">{api.info.description}</p>
                <h3 className="text-lg font-semibold mt-4">
                  Swagger Documentation
                </h3>
                <p className="mt-2 text-gray-300">
                  <a
                    href={api.swaggerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200"
                  >
                    View Swagger UI
                  </a>
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mt-4">Contact</h3>
                  <p className="mt-2 text-gray-200">
                    <span className="mr-2 font-semibold">Name:</span>{" "}
                    {api.info.contact.name}
                  </p>
                  <p className="mt-2 text-gray-200">
                    <span className="mr-2 font-semibold">Email:</span>
                    <a
                      href={`mailto:${api.info.contact.email}`}
                      className="text-gray-200"
                    >
                      {api.info.contact.email}
                    </a>
                  </p>
                  <p className="mt-2 text-gray-200">
                    <span className="mr-2 font-semibold">Website:</span>
                    <a
                      href={api.info.contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200"
                    >
                      {api.info.contact.url}
                    </a>
                  </p>
                  {api.info.contact["x-twitter"] && (
                    <p className="mt-2 text-gray-200">
                      <span className="mr-2 font-semibold">Twitter:</span>
                      <a
                        href={`https://twitter.com/${api.info.contact["x-twitter"]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200"
                      >
                        @{api.info.contact["x-twitter"]}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-red-500">No API data available.</p>
      )}

      <div className="mt-8">
        <Link
          to="#"
          onClick={handleSidebarOpen}
          className="px-6 py-3 text-lg text-white bg-[#1CA7D6] rounded transition duration-300 hover:bg-[#1694C0] focus:outline-none focus:ring-2 focus:ring-blue-300"
          style={{ textDecoration: "none" }}
        >
          Explore Web APIs
        </Link>
      </div>

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

export default Provider;
