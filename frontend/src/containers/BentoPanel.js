import React from 'react';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';

function BentoPanel({ item1, item2, view, style={}, overlayMarginBottom }) {
    return view === "desktop" ?
        <WhiteOverlay style={{display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", marginBottom: overlayMarginBottom}}>
            <div style={style}>
                {item1}
            </div>
            {item2}
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