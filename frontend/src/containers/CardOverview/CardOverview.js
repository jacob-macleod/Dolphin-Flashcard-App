import React from 'react';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';
import ReactMarkdown from 'react-markdown';

function CardOverview({ text }) {
    return (
        <WhiteOverlay
            children={
                <div style={{
                    paddingTop: "22px",
                    paddingBottom: "22px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                }}>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
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