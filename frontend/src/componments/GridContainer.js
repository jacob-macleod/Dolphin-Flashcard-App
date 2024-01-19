import React from 'react';
import './GridContainer.css';

function GridContainer({ children }) {
  return (
    <div className="grid-container">
      {children}
    </div>
  );
}

export default GridContainer;