const DatabaseConnectForm = ({ onClose }: { onClose: () => void }) => {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Connect Database</h2>
        <input type="text" placeholder="Database Name" className="border p-2 rounded w-full mb-2" />
        <input type="text" placeholder="Host" className="border p-2 rounded w-full mb-2" />
        <input type="text" placeholder="Port" className="border p-2 rounded w-full mb-2" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Connect</button>
      </div>
    );
  };
  
  export default DatabaseConnectForm;
  