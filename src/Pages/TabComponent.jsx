import React, { useState } from "react";
import Clusters from "./Clusters";
import CameraPage from "./CameraPage";
import Machine from "./Machine";
const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("Cluster");

  const tabs = [
    { name: "Cluster", content: <Clusters /> },
    { name: "Machine", content: <Machine /> },
    { name: "Camera", content: <CameraPage /> },
  ];

  return (
    <div className="w-full max-w-xxl mx-auto mt-8">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex-1 py-2 px-4 text-center border-b-2 ${
              activeTab === tab.name
                ? "border-blue-500 text-blue-500 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="p-4 bg-white border border-gray-200 rounded-b-lg shadow-sm">
        {tabs.map(
          (tab) =>
            activeTab === tab.name && (
              <div key={tab.name}>
                <p className="text-gray-700">{tab.content}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TabComponent;
