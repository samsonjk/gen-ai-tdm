"use client";

import Link from "next/link";
import { LayoutDashboard, Database, Settings, LogOut } from "lucide-react";
import { JSX, useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      {/* Sidebar Header */}
      <div className="flex items-center p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none">
          {isOpen ? "🔽" : "🔼"}
        </button>
        {isOpen && <h1 className="ml-3 text-lg font-bold">Azure Clone</h1>}
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 flex-1 px-4">
        <SidebarLink href="/dashboard" icon={<LayoutDashboard />} label="Dashboard" isOpen={isOpen} />
        <SidebarLink href="/databases" icon={<Database />} label="Databases" isOpen={isOpen} />
        <SidebarLink href="/settings" icon={<Settings />} label="Settings" isOpen={isOpen} />
      </nav>

      {/* Logout Button (Always at Bottom) */}
      <div className="mt-auto p-4">
        <button className="flex items-center space-x-2 text-red-400 w-full hover:bg-gray-800 p-2 rounded-lg">
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

// Sidebar Link Component
const SidebarLink = ({ href, icon, label, isOpen }: { href: string; icon: JSX.Element; label: string; isOpen: boolean }) => (
  <Link href={href} className="flex items-center space-x-2 p-3 hover:bg-gray-800 rounded-lg">
    {icon}
    {isOpen && <span>{label}</span>}
  </Link>
);

export default Sidebar;
