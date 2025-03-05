import React from 'react';
import './Subheader.css';

function Subheader({ text, style = {} }) {
  return (
    <p className="subheader" style={style}>
      {text}
    </p>
  );
}

export default Subheader;
