"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // For loading GIF
import { Mail, Menu, MessageCircle, Plus, Share2, Star } from "lucide-react";

const AppView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [tableData, setTableData] = useState<{ id: number; name: string; phone: string; address: string; zipcode: string; service: string; }[] | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, tableData]);

  const handleSendMessage = (type: string) => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: type === "search" ? "Fetching search results..." : "Deep AI thoughts on this..." },
      ]);

      setTimeout(() => {
        if (type === "search") {
          setTableData([
            { id: 1, name: "Alice Johnson", phone: "123-456-7890", address: "123 Elm St", zipcode: "10001", service: "AT&T" },
            { id: 2, name: "Bob Smith", phone: "987-654-3210", address: "456 Oak Ave", zipcode: "20002", service: "Verizon" },
            { id: 3, name: "Charlie Brown", phone: "555-555-5555", address: "789 Pine Rd", zipcode: "30003", service: "T-Mobile" },
            { id: 4, name: "Diana Ross", phone: "111-222-3333", address: "321 Maple Ln", zipcode: "40004", service: "Sprint" },
            { id: 5, name: "Ethan Hunt", phone: "666-777-8888", address: "654 Cedar Dr", zipcode: "50005", service: "Xfinity" },
          ]);
        } else {
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { role: "ai", content: "Deep AI thoughts on this..." },
          ]);
        }
        setLoading(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Pane - Chat History */}
      <div className={`bg-gray-800 text-white p-4 h-full transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="flex items-center justify-between">
          <h1 className={`${isSidebarOpen ? "text-lg font-bold" : "hidden"}`}>Chat History</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <button className="flex items-center mt-4 space-x-2 text-blue-400 hover:text-blue-300">
          <Plus className="w-5 h-5" />
          {isSidebarOpen && <span>New Chat</span>}
        </button>
        <div className="mt-4 space-y-2">
          {[{ id: 1, title: "Chat with AI" }, { id: 2, title: "Project Discussion" }, { id: 3, title: "Feature Request" }].map((chat) => (
            <div key={chat.id} className="block p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
              <MessageCircle className="inline w-5 h-5 mr-2" />
              {isSidebarOpen && chat.title}
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane - Chat Window */}
      <div className="flex flex-col flex-1 p-6">
        {/* Chat Messages (Takes up remaining space) */}
        <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">Start a conversation...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`p-3 my-2 ${msg.role === "user" ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white ml-auto rounded-lg text-right w-[40%] max-w-[40%]" : "text-gray-900 dark:text-white self-start w-auto"}`}>
                {msg.content}
                {msg.content === "Fetching search results..." && (
                  <Image src="/loading.gif" alt="Loading" width={20} height={20} className="inline ml-2" />
                )}
              </div>
            ))
          )}

          {/* Show Table when search results are available */}
          {tableData && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-left">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">ID</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Customer Name</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Phone</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Address</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Zipcode</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Wireless Service</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{customer.id}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{customer.name}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{customer.phone}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{customer.address}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{customer.zipcode}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{customer.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
             
            </div>
            
          )}
         
          <div ref={chatEndRef} />
        </div>

        {/* Search Box at the Bottom */}
<div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md w-full flex justify-center">
  <div className="w-[70%] flex flex-col items-center">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask anything..."
      className="w-full px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl shadow focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
    />
    <div className="mt-4 flex justify-center space-x-4">
      <button onClick={() => handleSendMessage("search")} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Search
      </button>
      <button onClick={() => handleSendMessage("think")} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
        Think
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default AppView;
