const DatabaseTree = () => {
    const dbTree = {
      PostgreSQL: {
        Tables: ["Users", "Orders", "Products"],
        Sequences: ["OrderID_seq"],
        Constraints: ["PK_Users", "FK_Orders_Users"]
      }
    };
  
    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">Database Explorer</h2>
        <ul>
          {Object.entries(dbTree).map(([db, objects]) => (
            <li key={db} className="mb-2">
              <strong>{db}</strong>
              <ul className="ml-4">
                {Object.entries(objects).map(([type, items]) => (
                  <li key={type}>
                    <strong>{type}</strong>
                    <ul className="ml-4">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DatabaseTree;
  