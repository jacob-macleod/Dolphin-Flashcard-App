import React from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';
import './MenuItem.css';

function MenuItem({ text, clicked=false, src, imgUrl="" }) {

    return (
        <div
            className={clicked ? "menu-item-clicked" : "menu-item"}
            style={{display: "inline-flex", width: "178px"}}>
            <Image
                width="16px"
                height="16px"
                url={imgUrl}
                className="menu-icon"
            />
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