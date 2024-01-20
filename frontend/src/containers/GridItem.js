import React from 'react';
import './GridItem.css';

function GridItem({ children, style }) {
  const gridItemStyle = style || {};
  return <div className="grid-item" style={gridItemStyle}>{children}</div>;
}

export default GridItem;
