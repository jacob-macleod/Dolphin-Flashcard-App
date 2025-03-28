import React from 'react';
import NavBarButton from './NavBarButton';
import './MobilePageWrapper.css';

function MobilePageWrapper({ children, view }) {
  return view === "mobile"
    ? <div className="mobile-page-grid-container">
        {children}
        <div className='nav-bar-wrapper'>
            <div className='nav-bar'>
                <NavBarButton text="Dashboard" />
                <NavBarButton text="Flashcards" />
                <NavBarButton text="Community" />
                <NavBarButton text="Settings" />
                <NavBarButton text="Leaderboard" />
            </div>
        </div>
    </div>
    : children
}

export default MobilePageWrapper;
