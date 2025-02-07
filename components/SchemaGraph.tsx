'use client';

import React, { useEffect, useRef } from 'react';
import cytoscape, { Core, ElementDefinition } from 'cytoscape';

interface Schema {
  [key: string]: {
    columns: Array<{ name: string; type: string }>;
    relationships: Array<{
      constrained_columns: string[];
      referred_table: string;
    }>;
  };
}

interface SchemaGraphProps {
  schema: Schema;
}

const SchemaGraph: React.FC<SchemaGraphProps> = ({ schema }) => {
  const cyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const elements: ElementDefinition[] = [];

    // Populate nodes and edges from schema
    Object.keys(schema).forEach((table) => {
      elements.push({ data: { id: table, label: table } });

      schema[table].relationships.forEach((rel) => {
        elements.push({
          data: {
            source: table,
            target: rel.referred_table,
            label: `FK: ${rel.constrained_columns.join(', ')}`,
          },
        });
      });
    });

    // Initialize Cytoscape
    const cy: Core = cytoscape({
      container: cyRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#f07BFF',
            label: 'data(label)',
            color: '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px',
            'border-width': 2,
            'border-color': '#ff0000',
          },
        },
        {
          selector: 'edge',
          style: {
            'line-color': '#A0A0A0',
            'target-arrow-color': '#A0A0A0',
            'target-arrow-shape': 'triangle',
            label: 'data(label)',
            color: '#555',
            'font-size': '10px',
            'curve-style': 'bezier',
          },
        },
      ],
      layout: {
        name: 'grid', // You can use other layouts like 'breadthfirst', 'circle', or 'cose'
        rows: 3,
      },
    });

    return () => {
      cy.destroy();
    };
  }, [schema]);

  return <div ref={cyRef} style={{ width: '100%', height: '500px' }} />;
};

export default SchemaGraph;
