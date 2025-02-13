"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, User, Moon, Sun, MoreVertical } from "lucide-react";
import Link from "next/link";

const TopNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const user = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    profileImage: "https://via.placeholder.com/50",
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    }

    if (isDropdownOpen || isMoreMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, isMoreMenuOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-14 px-4 bg-white dark:bg-gray-800 shadow">
      {/* Left Section: Logo & Name */}
      <div className="flex items-center space-x-2">
      <Link href="/app-dashboard">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        </Link>
        <h1 className="text-md font-semibold text-gray-800 dark:text-white">Smart Test Data Managment</h1>
      </div>

      {/* Right Section: Search, Notifications, Dark Mode, Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none w-full"
          />
        </div>

        {/* Notification Icon */}
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User Info & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user.fullName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <User className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50">
              <div className="flex items-center space-x-4 border-b pb-3">
                <img src={user.profileImage} alt="Profile" className="w-10 h-10 rounded-full border" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user.fullName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <a href="/profile" className="block text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
                  View Account
                </a>
                <button className="w-full text-left text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Three Dots Menu */}
        <div className="relative" ref={moreMenuRef}>
          <button onClick={() => setMoreMenuOpen(!isMoreMenuOpen)} className="text-gray-600 dark:text-gray-300">
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Three Dots Popup Menu */}
          {isMoreMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50">
              <button className="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
                Settings
              </button>
              <button className="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
                Help & Support
              </button>
              <button className="w-full text-left text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
