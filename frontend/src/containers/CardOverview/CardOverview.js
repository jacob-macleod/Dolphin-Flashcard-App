import React from 'react';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';
import "../../componments/Text/Text/Text.css";
import DOMPurify from 'dompurify';

function sanitizeHtml(html) {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['strong', 'em', 'u', 's', 'span', 'br'],
        ALLOWED_ATTR: ['style'],
        FORBID_ATTR: ['class', 'id', 'onclick', 'onmouseover', 'onerror'],
        ALLOWED_STYLES: {
            '*': {
                // Only allow color style
                color: true,
            },
        },
        FORBID_STYLE: ['width', 'height'],
    });
}


function CardOverview({ text }) {
    let htmlText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
        .replace(/~~(.*?)~~/g, '<s>$1</s>')
        .replace(/<span style="color:(.*?)">(.*?)<\/span>/g, '<span style="color:$1">$2</span>');

    const sanitizedHtmlText = sanitizeHtml(htmlText);

    return (
        <WhiteOverlay
            children={
                <div style={{
                    paddingTop: "22px",
                    paddingBottom: "22px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                }}
                >
                    <p className="flashcard-text" dangerouslySetInnerHTML={{ __html: sanitizedHtmlText }}/>
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