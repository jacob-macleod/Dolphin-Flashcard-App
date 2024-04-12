import React from 'react';
import './Blob.css'

function Blob({ position }) {
    return (
        <div
            className="blob"
            style={{
                float:position.float || "left",
                marginTop: position.marginTop || "0vh",
        }}>
        </div>
    );
}

export default Blob;