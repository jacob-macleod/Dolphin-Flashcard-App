import React from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';
import './MenuItem.css';

function MenuItem({ text, clicked=false, src, imgUrl="", width="178px", margin=null, onClick=null, float=null}) {

    return (
        <div
            className={clicked ? "menu-item-clicked" : "menu-item"}
            style={{display: "inline-flex", width: width, margin: margin, float: float}}
            onClick={onClick}
        >
            {imgUrl === "" ? null :<Image
                width="16px"
                height="16px"
                minWidth='16px'
                url={imgUrl}
                className="menu-icon"
            />}
            <Link to={src} style={{textDecoration: "none"}}>
                <p className={clicked ? "menu-item-text-clicked" : "menu-item-text"}
                    style={{margin: "0px", height: "min-content"}}>
                    {text}
                </p>
            </Link>
        </div>
    );
}

export default MenuItem;