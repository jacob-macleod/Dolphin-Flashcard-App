import React from 'react';
import './GridContainer.css';

function GridContainer({ children, layout, classType }) {
  const type = classType || 'grid-container';
  const containerStyle = {
    gridTemplateColumns: layout || 'auto auto auto',
  }

  return (
    <div className={type}
    style={containerStyle}>
      {children}
    </div>
  );
}

export default GridContainer;