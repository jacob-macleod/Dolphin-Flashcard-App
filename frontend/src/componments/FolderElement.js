import React, { useState, useEffect } from 'react';
import Image from './Image';
import Paragraph from './Paragraph';

import horizontalTriangle from '../static/horizontal-triangle.svg';
import verticalTriangle from '../static/vertical-triangle.svg';
import horizontalTriangleWhite from '../static/horizontal-triangle-white.svg';
import verticalTriangleWhite from '../static/vertical-triangle-white.svg';

import './FlashcardFolder.css';
import './FolderElement.css';

function FlashcardFolder({ element, name, child, folderKey, path, selectedPath, setSelectedPath }) {
    const [selected, setSelected] = React.useState(false);
    const [showChildren, setShowChildren] = useState(false);

    function toggleChildren() {
        setShowChildren(!showChildren);
    }

    function toggleClick() {
        if (selected) {
            setSelected(false);
        } else{
            setSelectedPath(path);
            setSelected(true);
        }
    }

    useEffect(() => {
        if (selectedPath !== path) {
            setSelected(false);
        }
    }, [selectedPath]);

    return (
        <div key={folderKey} className='folder-wrapper'>
            <div className={selected ? 'flashcard-item-blue' : 'flashcard-item'}>
                <Image
                    url={showChildren ?
                        selected ? verticalTriangleWhite : verticalTriangle
                        : selected ? horizontalTriangleWhite : horizontalTriangle}
                    width='16px' height="16px"
                    onClick={toggleChildren}
                />
                <Paragraph text={name} style={{
                        margin: "0px",
                        lineHeight: "1",
                        textAlign: "left",
                        color: selected ? "#FFFFFF" : "#222829"
                }} onClick={toggleClick}/>
            </div>
            <div className='child-wrapper' style={{
                display: showChildren ? 'block' : 'none',
            }}>
                {child}
            </div>
        </div>
    );
}

export default FlashcardFolder;
