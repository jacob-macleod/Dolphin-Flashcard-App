import React from 'react';
import Button from '../../componments/Button';
import Paragraph from '../../componments/Text/Paragraph';
import "./FeaturedFlashcardTile.css";
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';

function FeaturedFlashcardTile({ title, url, view, previewButtonText="Preview" }) {

    function goToUrl() {
        window.location.href = url;
    }

    return (
        <WhiteOverlay className={view === "desktop" ? "featured-community-set" : "featured-community-set-mobile"}>
            <Paragraph text={title} style={{textAlign: "left"}}/>
            <Button text={previewButtonText} onClick={goToUrl} />
        </WhiteOverlay>
    );
}

export default FeaturedFlashcardTile;
