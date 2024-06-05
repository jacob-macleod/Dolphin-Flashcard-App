import React from 'react';
import './GridItem.css';

function GridItem({ children, style={} }) {
  return <div className="grid-item" style={style}>{children}</div>;
}

export default GridItem;
