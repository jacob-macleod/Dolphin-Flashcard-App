import React from 'react';

import './DevSection.css';
function DevSection({ view }) {
  return (
    <div
      className="dev-section-container"
      style={{ padding: view === 'mobile' ? '16px 60px' : '32px 120px' }}
    >
      <h3
        className="dev-section-header"
        style={{ fontSize: view === 'mobile' ? '28px' : '38px' }}
      >
        We're open source!
      </h3>
      <p className="dev-section-text">
        Dolphin flashcards is officially open source under the MIT license, so
        you can contribute to it.{' '}
        <a
          href="https://www.google.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Find us here.
        </a>
      </p>
    </div>
  );
}

export default DevSection;
