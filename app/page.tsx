"use client";

import { LayoutDashboard, Database, Server, Users, PlusCircle } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import { JSX } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

const Dashboard = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Dashboard" } // No link = current page
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen">
      <main className="w-full max-w-6xl px-6">
        {/* Centered Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10 text-center mt-[2vh]">
          Smart Test Data Management
        </h1>

        {/* Dashboard Cards Grid (Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <Link href="/app-dashboard">
            <DashboardCard
              title="CCR-R"
              value="Active"
              icon={<Database className="w-8 h-8 text-blue-500" />}
            />
          </Link>
          <Link href="/app-dashboard">
            <DashboardCard
              title="AIMax"
              value="Syncing"
              icon={<Users className="w-8 h-8 text-green-500" />}
            />
          </Link>
          <Link href="/app-dashboard">
            <DashboardCard
              title="PAAT"
              value="Data Loading"
              icon={<Server className="w-8 h-8 text-red-500" />}
            />
          </Link>
        </div>

        {/* "Create New APP" Button (Centered Below Grid) */}
        <div className="mt-8 flex justify-center">
          <Link href="/create-project">
            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
              <PlusCircle className="w-6 h-6" />
              <span>Create New APP</span>
            </button>
          </Link>
        </div>
      </main>
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
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </h2>
      <p className="text-l font-bold text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </div>
  </div>
);

export default Dashboard;
