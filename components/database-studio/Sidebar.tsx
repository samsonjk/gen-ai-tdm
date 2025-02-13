import { Database, BarChart2 } from "lucide-react";

interface SidebarProps {
  activeTab: "explorer" | "visualizer";
  setActiveTab: (tab: "explorer" | "visualizer") => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-6">
      <button onClick={() => setActiveTab("explorer")} className={`p-2 ${activeTab === "explorer" ? "bg-gray-700" : ""}`}>
        <Database className="w-6 h-6" />
      </button>
      <button onClick={() => setActiveTab("visualizer")} className={`p-2 ${activeTab === "visualizer" ? "bg-gray-700" : ""}`}>
        <BarChart2 className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Sidebar;
