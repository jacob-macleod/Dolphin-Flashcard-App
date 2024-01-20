import React from 'react';
import './GridContainer.css';

function GridContainer({ children, layout }) {
  const containerStyle = {
    gridTemplateColumns: layout || 'auto auto auto',
  }
  return (
    <div className="grid-container"
    style={containerStyle}>
      {children}
    </div>
  );
}

export default GridContainer;