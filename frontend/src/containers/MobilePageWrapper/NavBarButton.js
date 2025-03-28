import React from 'react';
import Image from '../../componments/Image';
import './MobilePageWrapper.css';

function MobilePageWrapper({ image, text, clicked=false }) {
  return <div className={clicked ? 'nav-bar-item-active' : 'nav-bar-item'}>
        <Image src={image} width='20px' height='20px'/>
        <p className='nav-bar-item-text'>{text}</p>        
    </div>
}

export default MobilePageWrapper;
