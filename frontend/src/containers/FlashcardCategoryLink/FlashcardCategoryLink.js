import React from 'react';

function FlashcardCategoryLink({ category, disabled }) {

    function onClick() {
        if (disabled) return; // Do nothing if the link is disabled
        const categoryName = category.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/community/${categoryName}`;
    }

    const linkStyle = {
        marginTop: "8px",
        marginBottom: "8px",
    }

    return (
        <div className="flashcard-category-link" onClick={onClick}>
            <p className={disabled ? "inactive-link-underlined" : "link"} style={linkStyle}>{category}</p>
        </div>
    );
}

export default FlashcardCategoryLink;
