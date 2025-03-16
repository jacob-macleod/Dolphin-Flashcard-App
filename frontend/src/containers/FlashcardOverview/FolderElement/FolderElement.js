import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import Image from '../../../componments/Image';
import Paragraph from '../../../componments/Text/Paragraph';

import horizontalTriangle from '../../../static/horizontal-triangle.svg';
import verticalTriangle from '../../../static/vertical-triangle.svg';
import horizontalTriangleWhite from '../../../static/horizontal-triangle-white.svg';
import verticalTriangleWhite from '../../../static/vertical-triangle-white.svg';

import '../FlashcardFolder.css';
import './FolderElement.css';

function FolderElement({ element, name, child, folderKey, path, selectedPath, setSelectedPath }) {
    const [selected, setSelected] = React.useState(false);
    const [showChildren, setShowChildren] = useState(false);
    const isYourAccount = name === "Your Account";
    const {darkMode} = useTheme();

    function toggleChildren() {
        setShowChildren(!showChildren);
    }

    function toggleClick() {
        if (selected) {
            setSelectedPath(null);
            setSelected(false);
        } else {
            setSelectedPath(path);
            setSelected(true);
        }
    }

    useEffect(() => {
        if (selectedPath !== path) {
            setSelected(false);
        }
    }, [selectedPath]);

    const getTextColor = () => {
        
        if (darkMode) return "var(--text-dark)";
        return selected ? "var(--text-dark)" : "var(--text-light)";
    };

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
                    color: getTextColor()
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

export default FolderElement;
