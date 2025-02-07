"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  link?: string; // Optional link (if missing, it's the current page)
}

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {/* Clickable Link if link exists, otherwise just text */}
          {item.link ? (
            <Link href={item.link} className="text-blue-600 hover:text-blue-800 capitalize">
              {item.label}
            </Link>
          ) : (
            <span className="capitalize text-gray-500 dark:text-gray-400 font-semibold">
              {item.label}
            </span>
          )}
          {/* Add separator unless it's the last item */}
          {index < items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
