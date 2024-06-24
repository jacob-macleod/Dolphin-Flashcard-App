import { React, useEffect, useState } from 'react';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';
import GhostButton from '../../componments/GhostButton';
import "../../componments/Text/Text/Text.css";
import DOMPurify from 'dompurify';

function sanitizeHtml(html) {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['strong', 'em', 'u', 's', 'span', 'br', 'p', 'ol', 'li'],
        ALLOWED_ATTR: ['style'],
        FORBID_ATTR: ['class', 'id', 'onclick', 'onmouseover', 'onerror'],
        ALLOWED_STYLES: {
            '*': {
                color: true,
            },
        },
        FORBID_STYLE: ['width', 'height'],
    });
}

const ghostButtonStyle = {
    marginLeft: "0px",
    marginRight: "0px",
};

function CardOverview({ text, description: back = "", showResponseOptions = false, showTurnOverButton = false, height="fit-content" }) {
    let htmlText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
        .replace(/~~(.*?)~~/g, '<s>$1</s>')
        .replace(/<span style="color:(.*?)">(.*?)<\/span>/g, '<span style="color:$1">$2</span>');
    const sanitizedFront = sanitizeHtml(htmlText);
    const sanitizedBack = sanitizeHtml(back);
    const [cardText, setCardText] = useState(sanitizedFront);
    const [isFlipped, setIsFlipped] = useState(false);

    function turnOverCard() {
        setIsFlipped(!isFlipped);
        setTimeout(() => {
            if (cardText === sanitizedFront) {
                setCardText(sanitizedBack);
            } else {
                setCardText(sanitizedFront);
            }
        }, 75); // Adjust this timeout based on animation duration
    }

    // Make sure the card is flipped back when the text changes
    useEffect(() => {
        setCardText(sanitizedFront);
        setIsFlipped(false);
    }, [text]);

    return (
        <WhiteOverlay
            isFlipped={isFlipped}
            flipOnClick={true}
            children={
                <div style={{
                    paddingTop: "22px",
                    paddingBottom: "22px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    perspective: "1000px",
                    height: height,
                }}
                >
                    {showTurnOverButton &&
                        <GhostButton
                            text="Turn over"
                            border="none"
                            style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                color: "#6A84C5",
                            }}
                            onClick={turnOverCard}
                        />
                    }
                    <div style={{ transformStyle: "preserve-3d" }}>
                        <p className="flashcard-text" dangerouslySetInnerHTML={{ __html: cardText }} />
                    </div>
                    {showResponseOptions &&
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginTop: "20px",
                        }}>
                            <GhostButton text="I know" style={ghostButtonStyle} />
                            <GhostButton text="I'm not sure" style={ghostButtonStyle} />
                            <GhostButton text="This is easy" style={ghostButtonStyle} />
                        </div>
                    }
                </div>
            }
            style={{
                width: "100%",
                margin: "7px",
                padding: "0px",
                height: "90%",
            }}
        />
    );
}

export default CardOverview;
