import React from 'react';

export const legendBlockBuilder = (color: string, width: string, label: string) => {
  return (
    <li key={color} style={{ background: color, width: `${width}%` }}>
      {label}
    </li>
  );
};
