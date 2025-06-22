import React from 'react';
import Button from '../../componments/Button';
import Paragraph from '../../componments/Text/Paragraph';
import "./FeaturedCommunitySet.css";
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';

function FeaturedCommunitySet({ title, url }) {

    function goToUrl() {
        window.location.href = url;
    }

    return (
        <WhiteOverlay className="featured-community-set">
            <Paragraph text={title} style={{textAlign: "left"}}/>
            <Button text="Preview" onClick={goToUrl} />
        </WhiteOverlay>
    );
}

export default FeaturedCommunitySet;
