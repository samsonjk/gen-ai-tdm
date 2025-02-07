"use client";

import { LayoutDashboard, Database, Server, Users, PlusCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import { JSX } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

const Dashboard = () => {

    const breadcrumbItems = [
        { label: "Home", link: "/" },
        { label: "Dashboard"} // No link = current page
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
             <Breadcrumb items={breadcrumbItems} />{/* Displaying the breadcrumb */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {process.env.NEXT_PUBLIC_APP_TITLE}
          </h1>

          {/* Dashboard Cards Grid (Responsive) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* "Create New Project" Card */}
            
            <a
              href="/create-project"
              className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <PlusCircle className="w-6 h-6 text-blue-500" />
              <h2 className="mt-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Create New APP
              </h2>
            </a>

            {/* Other Dashboard Cards */}
            <Link href="/app-dashboard">
            <DashboardCard
              title="Database Usage"
              value="32 GB / 100 GB"
              icon={<Database className="w-8 h-8 text-blue-500" />}
            />
            </Link>
            <Link href="/app-dashboard">
            <DashboardCard
              title="Active Users"
              value="12,450"
              icon={<Users className="w-8 h-8 text-green-500" />}
            />
            </Link>
             <Link href="/app-dashboard">
            <DashboardCard
              title="Server Health"
              value="Operational"
              icon={<Server className="w-8 h-8 text-red-500" />}
            />
            </Link>
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

export default Dashboard;
