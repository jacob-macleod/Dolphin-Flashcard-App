import React, { useEffect, useState, useRef } from 'react';
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

function CardOverview({ text, description: back = "", showResponseOptions = false, showTurnOverButton = false, height="fit-content", setResponse=()=>{} }) {
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
    const isFlippedRef = useRef(isFlipped);

    function turnOverCard() {
        setIsFlipped((prev) => !prev);
        setTimeout(() => {
            setCardText((prev) => (prev === sanitizedFront ? sanitizedBack : sanitizedFront));
        }, 75); // Adjust this timeout based on animation duration
    }

    // Update the ref whenever isFlipped changes
    useEffect(() => {
        isFlippedRef.current = isFlipped;
    }, [isFlipped]);

    // Make sure the card is flipped back when the text changes
    useEffect(() => {
        setCardText(sanitizedFront);
        setIsFlipped(false);
    }, [text]);

    function handleKeyDown(event) {
        if (event.key === " ") {
            event.preventDefault(); // Prevent the default action of the space key
            turnOverCard();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
                    {(showTurnOverButton || showResponseOptions && isFlipped === false) &&
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
                    {(showResponseOptions && isFlipped) ?
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginTop: "20px",
                        }}>
                            <GhostButton text="I know" style={ghostButtonStyle} onClick={() => {
                                setResponse("I know");
                            }}/>
                            <GhostButton text="I'm not sure" style={ghostButtonStyle} onClick={() => {
                                setResponse("I'm not sure");
                            }}/>
                            <GhostButton text="This is easy" style={ghostButtonStyle} onClick={() => {
                                setResponse("This is easy");
                            }}/>
                        </div>
                    : <></>}
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
