import React from 'react';

import './ProjectProgress.css';
import Header from '../Text/Header';
import Subheader from '../Text/Subheader';
import Paragraph from '../Text/Paragraph';
import arrow from '../../static/milestone-arrow.png';
import Image from '../Image';

function ProjectMilestone({ titleText, dateText, detailsText }) {
  return (
    <div className="project-progress-milestone">
      <Image
        width={'min-content'}
        height={24}
        url={arrow}
        objectFit="contain"
        className="milestone-arrow"
      />
      <Subheader text={titleText} style={{ fontSize: '21px' }} />
      <p className="milestone-date">{dateText}</p>
      <Paragraph
        text={detailsText}
        style={{
          color: '#616583',
          textAlign: 'start',
          lineHeight: '24px',
          marginTop: '-0px',
          width: '90%',
        }}
      />
    </div>
  );
}

function ProgressBar() {
  let progressPercentage = 37;

  if (progressPercentage > 100) progressPercentage = 100;
  else if (progressPercentage < 0) progressPercentage = 0;

  return (
    <div
      className="project-progress-progress-bar"
      style={{
        width: '100%',
        background: `linear-gradient(to right, #6A84C5 ${progressPercentage}%, #C9D5F2 ${progressPercentage}%)`,
      }}
    ></div>
  );
}

function ProjectProgress({ view }) {
  // Difficult to implement a mobile version due to limited screen width! Display nothing for now
  if (view === 'mobile') return <></>;
  return (
    <div
      className="project-progress-container"
      style={{ padding: view === 'mobile' ? '16px 30px' : '32px 120px' }}
    >
      <Header text="How close are we?" />
      <ProgressBar />
      <div className="project-progress-milestone-container">
        <ProjectMilestone
          titleText={'Version 1 - Initial launch'}
          dateText={'MID 2024'}
          detailsText={'Initial version with basic features.'}
        />
        <ProjectMilestone
          titleText={'Version 2 - Complete version'}
          dateText={'LATE 2024 - EARLY 2025'}
          detailsText={'Full version with more features'}
        />
        <ProjectMilestone
          titleText={'Version 3 - Fully-fledged App'}
          dateText={'MID 2025'}
          detailsText={'More advanced version with many features'}
        />
      </div>
    </div>
  );
}

export default ProjectProgress;
