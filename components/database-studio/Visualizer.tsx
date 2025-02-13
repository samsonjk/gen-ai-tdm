'use client';

import { useEffect, useState } from 'react';
import SchemaGraph from '@/components/SchemaGraph';


interface Schema {
  [key: string]: {
    columns: Array<{ name: string; type: string }>;
    relationships: Array<{
      constrained_columns: string[];
      referred_table: string;
    }>;
  };
}

const Visualizer: React.FC = () => {
  const [schema, setSchema] = useState<Schema | null>(null);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/schema'); // Update with your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch schema');
        }
        const data: Schema = await response.json();
        setSchema(data);
      } catch (error) {
        console.error('Error fetching schema:', error);
      }
    };

    fetchSchema();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gen AI Test Data Management Tool</h1>
      {schema ? (
        <SchemaGraph schema={schema} />
      ) : (
        <p className="text-gray-500">Loading schema...</p>
      )}
    </div>
  );
};

export default Visualizer;
