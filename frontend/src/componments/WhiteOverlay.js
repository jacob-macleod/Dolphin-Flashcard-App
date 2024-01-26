import React from 'react';
import './WhiteOverlay.css'

function Text({ children, style }) {
    return (
        <div className="overlay"
        style={style}>
          {children}
        </div>
    );
}

export default Text;