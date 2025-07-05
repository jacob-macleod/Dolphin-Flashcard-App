import React from 'react';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';
import Button from '../../componments/Button';
import Paragraph from '../../componments/Text/Paragraph';

const FlashcardSearchResult = ({ data }) => {
    function onButtonClick() {
        window.open("/preview?id=" + data.id + "&name=" + data.name, "_self");
    }

    return (
        <WhiteOverlay style={{
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "auto",
            marginTop: "16px",
            marginBottom: "16px",
        }}>
            <Paragraph text={data.name} style={{alignContent: "center", justifySelf: "left", paddingLeft: "16px"}}/>
            <Button text="Preview" onClick={onButtonClick} style={{marginRight: "16px"}}/>
        </WhiteOverlay>
    );
};

export default FlashcardSearchResult;
