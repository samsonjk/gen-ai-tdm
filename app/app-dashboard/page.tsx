"use client";

import { Database, Code, Settings, LayoutDashboard } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { JSX } from "react";

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
      <main className="p-6">
        {/* Breadcrumb Section */}
        <Breadcrumb items={breadcrumbItems} /> {/* Displaying the breadcrumb */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 mt-6">
          App Dashboard
        </h1>

        {/* App Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Database Studio"
            value="Manage and visualize your databases"
            icon={<Database className="w-8 h-8 text-blue-500" />}
            link="/database-studio"
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
            title="App View"
            value="View application details"
            icon={<LayoutDashboard className="w-8 h-8 text-purple-500" />}
            link="/app-view"
          />
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({
  title,
  value,
  icon,
  link,
}: {
  title: string;
  value: string;
  icon: JSX.Element;
  link?: string;
}) => {
  const CardContent = (
    <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex items-center space-x-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      {icon}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {title}
        </h2>
        <p className="text-xs  text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );

  return link ? (
    <Link href={link} passHref>
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};

export default AppDashboard;
