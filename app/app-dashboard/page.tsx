"use client";

import { Database, Code, Settings, LayoutDashboard } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import { JSX } from "react";
import Breadcrumb from "@/components/Breadcrumb";

const AppDashboard = () => {

    const breadcrumbItems = [
        { label: "Home", link: "/" },
        { label: "Dashboard", link: "/dashboard" },
        { label: "CCR" } // No link = current page
      ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <main className="p-6">
             {/* Breadcrumb Section */}
             <Breadcrumb items={breadcrumbItems} /> {/* Displaying the breadcrumb */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            App Dashboard
          </h1>

          {/* App Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <DashboardCard
              title="Database Studio"
              value="Manage and visualize your databases"
              icon={<Database className="w-8 h-8 text-blue-500" />}
            />
            <DashboardCard
              title="Feature Engineering"
              value="Prepare and transform your data"
              icon={<Code className="w-8 h-8 text-green-500" />}
            />
            <DashboardCard
              title="Configuration"
              value="Configure application settings"
              icon={<Settings className="w-8 h-8 text-orange-500" />}
            />
            <DashboardCard
              title="App Page"
              value="View application details"
              icon={<LayoutDashboard className="w-8 h-8 text-purple-500" />}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: JSX.Element;
}) => (
  <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex items-center space-x-4">
    {icon}
    <div>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </h2>
      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </div>
  </div>
);

export default AppDashboard;
