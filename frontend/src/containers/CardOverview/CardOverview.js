import React from 'react';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';
import Paragraph from '../../componments/Text/Paragraph';

function CardOverview({ text }) {
    return (
        <WhiteOverlay
            children={
                <Paragraph
                    text={text}
                    style={{
                        paddingTop: "22px",
                        paddingBottom: "22px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                    }}
                />
            }
            style={{
                width: "100%",
                margin: "7px",
                padding: "0px",
            }}
        />
    );
}

export default CardOverview;