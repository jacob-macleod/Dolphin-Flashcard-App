import React from 'react';
import Paragraph from '../../componments/Text/Paragraph';

const FlashcardSort = ({ sortType, handleOptionChange }) => {
  return (
    <div className='sort-dialogue'>
      <Paragraph text="Sort:" />
      <select className="dropdown" value={sortType} onChange={handleOptionChange}>
        <option value="a-z" className="option">A-Z</option>
        <option value="z-a" className="option">Z-A</option>
        <option value="most-recent" className="option">Most Recent</option>
        <option value="least-recent" className="option">Least Recent</option>
      </select>
    </div>
  );
};

export default FlashcardSort;
