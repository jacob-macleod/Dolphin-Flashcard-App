import React from 'react';
import UserProfileHeader from '../componments/UserProfileHeader';
import './SidePanel.css';
import './GridItem.css';

function SidePanel () {
    const gridItemStyle = {
        width: "200px",
        padding: "0px"
    }

    return <div className='grid-item' style={gridItemStyle}>
        <div className="side-panel">
            <UserProfileHeader />
        </div>
    </div>;
}

export default SidePanel;