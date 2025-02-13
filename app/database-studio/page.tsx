"use client";

import { useState } from "react";
import Sidebar from "@/components/database-studio/Sidebar";
import Explorer from "@/components/database-studio/Explorer";
import DatabaseConnectForm from "@/components/database-studio/DatabaseConnectForm";
import Visualizer from "@/components/database-studio/Visualizer";
import TopNavbar from "@/components/TopNavbar";

const DatabaseStudio = () => {
  const [activeTab, setActiveTab] = useState<"explorer" | "visualizer">("explorer");
  const [showDatabaseForm, setShowDatabaseForm] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Top Navigation */}
      <TopNavbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Left Pane (Explorer) */}
        <div className="w-1/4 bg-white dark:bg-gray-800 shadow-md p-4 transition-all">
          <Explorer>
            {/* Search & Connect Database (Common for Both Modes) */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search database objects..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              className="mb-4 text-blue-500 hover:underline"
              onClick={() => setShowDatabaseForm(true)}
            >
              + Connect Database
            </button>
          </Explorer>
        </div>

        {/* Right Pane */}
        <div className="flex-1 p-6 bg-gray-200 dark:bg-gray-700">
          {showDatabaseForm ? <DatabaseConnectForm onClose={() => setShowDatabaseForm(false)} /> : <Visualizer />}
        </div>
      </div>
    </div>
  );
};

export default DatabaseStudio;
