import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  data: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleOpenProvider = (item: string) => {
    navigate("/provider", { state: { provider: item } });
  };

  return (
    <div
      className={`fixed inset-0 bg-[#111827] bg-opacity-75 text-white transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed right-0 top-0 w-80 h-full shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button className="p-2 bg-gray-300 hover:bg-gray-400" onClick={onClose}>
          Close
        </button>
        <div className="p-4">
          <h2 className="text-lg text-center">Select Provider</h2>

          <div className="mt-2 h-[calc(100vh-150px)] overflow-x-auto overflow-y">
            {data && data.length > 0 ? (
              <ul className="space-y-2">
                {data.map((item, index) => (
                  <li key={index} className="p-2 rounded">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => handleToggle(index)}
                      aria-expanded={openIndex === index}
                      aria-controls={`item-${index}`}
                    >
                      <span>{item}</span>
                      <span>
                        {openIndex === index ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                    {openIndex === index && (
                      <div
                        id={`item-${index}`}
                        className="flex items-center mt-2"
                        onClick={() => handleOpenProvider(item)} // Open provider on click
                      >
                        <img
                          src={`https://${item}/favicon.ico`}
                          alt={`${item} favicon`}
                          className="h-5 w-5 mr-2"
                        />
                        <span className="text-sm">
                          {item
                            .replace(/^https?:\/\//, "")
                            .replace(/\/$/, "")
                            .replace(
                              /\.(com|in|org|net|co|io|gov|edu|biz|info|me)(\/|$)/,
                              ""
                            )
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-600">No data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
