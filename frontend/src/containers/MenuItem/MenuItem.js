import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../componments/Image/Image';
import './MenuItem.css';

function MenuItem({ text, clicked=false, src, imgUrl="", width="178px",style=null, onClick=null, float=null}) {
    
    return (
        <div
            className={clicked ? "menu-item-clicked" : "menu-item"}
            style={{display: "inline-flex", width: width, float: float,...style}}
            onClick={onClick}
        >
            {imgUrl === "" ? null :<Image
                width="16px"
                height="16px"
                minWidth='16px'
                url={imgUrl}
                className="menu-icon"
            />}
            <Link
                to={src || '#'}
                style={{textDecoration: "none"}}
                onClick={(e) => {
                    if (onClick !== null) {
                        e.preventDefault();
                    }
                }}
            >
                <p className={clicked ? "menu-item-text-clicked" : "menu-item-text"}
                    style={{margin: "0px", height: "min-content"}}>
                    {text}
                </p>
            </Link>
        </div>
    );
}

export default MenuItem;