"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, User } from "lucide-react";

const TopNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Simulated user details (Replace with real user data from API)
  const user = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    profileImage: "https://via.placeholder.com/50", // Replace with actual user profile image
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow relative">
      {/* Search Bar */}
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none w-full"
        />
      </div>

      {/* Right Section: Notifications & Profile */}
      <div className="flex items-center space-x-6 relative">
        {/* Bell Icon */}
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer" />

        {/* User Info & User Icon (Aligned Horizontally) */}
        <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
          {/* Name & Email */}
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {user.fullName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>

          {/* User Icon (Clickable) */}
          <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="relative">
            <User className="w-8 h-8 text-gray-600 dark:text-gray-300 cursor-pointer" />
          </button>

          {/* Dropdown Menu (Appears Below the Icon) */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50">
              {/* Profile Info */}
              <div className="flex items-center space-x-4 border-b pb-3">
                <img src={user.profileImage} alt="Profile" className="w-12 h-12 rounded-full border" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user.fullName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>

              {/* Links */}
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
      </div>
    </header>
  );
};

export default TopNavbar;
