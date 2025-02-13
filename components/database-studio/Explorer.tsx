const Explorer = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Database Explorer</h2>
        {children}
  
        {/* Example Tree List (For Both Explorer & Visualizer Mode) */}
        <ul>
          <li className="font-bold">PostgreSQL</li>
          <ul className="ml-4">
            <li>📂 Tables
              <ul className="ml-4">
                <li>Users</li>
                <li>Orders</li>
                <li>Products</li>
              </ul>
            </li>
            <li>🔢 Sequences</li>
            <li>🔑 Constraints</li>
          </ul>
        </ul>
      </div>
    );
  };
  
  export default Explorer;
  