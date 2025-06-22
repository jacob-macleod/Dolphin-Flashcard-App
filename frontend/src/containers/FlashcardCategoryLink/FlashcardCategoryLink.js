// Make this into a component called FlashcardCategoryLink
import React from 'react';

function FlashcardCategoryLink({ category }) {

    function onClick() {
        const categoryName = category.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/community/${categoryName}`;
    }

    return (
        <div className="flashcard-category-link" onClick={onClick}>
        <p className="link">{category}</p>
        </div>
    );
}

export default FlashcardCategoryLink;
