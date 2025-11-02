import React from 'react';
import NavBarButton from './NavBarButton';
import './MobilePageWrapper.css';
import dashboardIconClicked from '../../static/dashboard-icon-clicked.svg';
import dashboardIconUnclicked from '../../static/dashboard-icon-unclicked.svg';
import flashcardsIconClicked from '../../static/flashcards-icon-clicked.svg';
import flashcardsIconUnclicked from '../../static/flashcards-icon-unclicked.svg';
import communityIconClicked from '../../static/community-icon-clicked.svg';
import communityIconUnclicked from '../../static/community-icon-unclicked.svg';
import settingsIconClicked from '../../static/settings-icon-clicked.svg';
import settingsIconUnclicked from '../../static/settings-icon-unclicked.svg';
import leaderboardIconClicked from '../../static/leaderboard-icon-clicked.svg';
import leaderboardIconUnclicked from '../../static/leaderboard-icon-unclicked.svg';
import warningIconUnclicked from '../../static/warning-icon-unclicked.svg'
function MobilePageWrapper({ children, view, itemClicked }) {
  return view === "mobile"
    ? <div className="mobile-page-grid-container">
        {children}
        <div className='nav-bar-wrapper'>
            <div className='nav-bar'>
                <NavBarButton
                    text="Dashboard"
                    src="/dashboard"
                    clickedImage={dashboardIconClicked}
                    unclickedImage={dashboardIconUnclicked}
                    clicked={itemClicked === "dashboard"}
                />
                <NavBarButton
                    text="Flashcards"
                    src="/flashcards"
                    clickedImage={flashcardsIconClicked}
                    unclickedImage={flashcardsIconUnclicked}
                    clicked={itemClicked === "flashcards"}
                />
                <NavBarButton
                    text="Community"
                    src="/community"
                    clickedImage={communityIconClicked}
                    unclickedImage={communityIconUnclicked}
                    clicked={itemClicked === "community"}
                />
                <NavBarButton
                    text="Settings"
                    src="/settings"
                    clickedImage={settingsIconClicked}
                    unclickedImage={settingsIconUnclicked}
                    clicked={itemClicked === "settings"}
                />
                <NavBarButton
                    text="Leaderboard"
                    src="/leaderboard"
                    clickedImage={leaderboardIconClicked}
                    unclickedImage={leaderboardIconUnclicked}
                    clicked={itemClicked === "leaderboard"}
                />
                <NavBarButton
                    text="Report Issues"
                    src="/https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAHPmNG5UOU1JOVBHTkNRMjREM0o2V0cwM0VXS0JCUC4u"
                    //clickedImage={leaderboardIconClicked}
                    unclickedImage={warningIconUnclicked}
                    clicked={itemClicked === "leaderboard"}
                />
            </div>
        </div>
    </div>
    : children
}

export default MobilePageWrapper;
