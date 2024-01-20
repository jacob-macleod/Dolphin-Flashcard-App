import React from 'react';
import './GridItem.css';

function GridItem({ children }) {
  return <div className="grid-item">{children}</div>;
}

export default GridItem;