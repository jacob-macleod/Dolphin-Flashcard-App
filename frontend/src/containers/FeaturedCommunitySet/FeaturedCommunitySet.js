import React from 'react';
import Button from '../../componments/Button';
import "./FeaturedCommunitySet.css";
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';

function FeaturedCommunitySet({ title, url }) {

    function goToUrl() {
        window.location.href = url;
    }

    return (
        <WhiteOverlay>
            <p>{title}</p>
            <Button text="Preview" onClick={goToUrl} />
        </WhiteOverlay>
    );
}

export default FeaturedCommunitySet;
