const DatabaseList = () => {
    const databases = ["PostgreSQL", "MySQL", "MongoDB"];
  
    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">Connected Databases</h2>
        <ul>
          {databases.map((db) => (
            <li key={db} className="p-2 border-b">{db}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DatabaseList;
  