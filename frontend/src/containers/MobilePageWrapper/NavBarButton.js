import React from 'react';
import Image from '../../componments/Image';
import './MobilePageWrapper.css';

function MobilePageWrapper({ clickedImage, unclickedImage, text, src, clicked=false }) {

  function wrapperClicked() {
    console.log("clicked");
    console.log(src);
    window.open(src, '_self');
  }

  return <div className={clicked ? 'nav-bar-item-active' : 'nav-bar-item'} onClick={() => {wrapperClicked()}}>
        <div className='icon-wrapper'>
          <Image url={clicked ? clickedImage : unclickedImage} width='20px' height='20px' minWidth='20px' paddingRight='0px'/>
        </div>
        <p className='nav-bar-item-text'>{text}</p>        
    </div>
}

export default MobilePageWrapper;
