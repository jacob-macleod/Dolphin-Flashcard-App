import React from 'react';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';

function BentoPanel({ item1, item2, view, style={}, overlayMarginBottom }) {
    return view === "desktop" ?
        <WhiteOverlay style={{display:"flex", alignItems: "center", marginBottom: overlayMarginBottom}}>
            <div>
                {item1}
            </div>
            <div>{item2}</div>
        </WhiteOverlay>
    :
    <WhiteOverlay style={{marginBottom: overlayMarginBottom}}>
        <div style={{padding: "0px", paddingBottom: "0px"}}>
            {item1}
            {item2}
        </div>
    </WhiteOverlay>;
}

export default BentoPanel;