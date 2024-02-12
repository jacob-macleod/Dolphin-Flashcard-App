import React from 'react';
import WhiteOverlay from '../componments/WhiteOverlay';
/*
<WhiteOverlay style={{display: "inline-flex"}}>
<div style={{width: "50%", padding: "16px", paddingLeft: "32px"}}>
  <Subheader text="Set goals, view them and see your progress - all in one place." />
  <Paragraph text="Setting goals? Important.
    Tracking them and achieving them? Even more. With Dolphin Flashcards
    you can easily view and track your goals so you never have to explain
    why you missed your deadline." />
  {signInButton}
</div>
    <Image width='465px' height='465px' url={goals}/>
</WhiteOverlay>
*/

function BentoPanel({ item1, item2, view, style={}, overlayMarginBottom }) {
    console.log({display: "inline-flex", marginBottom: overlayMarginBottom})
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