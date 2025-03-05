import React from 'react';
import Image from '../Image/Image';
import Button from '../Button';
import githubLogo from '../../static/github-logo.svg';
import darkGithubLogo from '../../static/dark-github-logo.svg';
import './DeveloperSection.css'

function handleClick() {
    window.open("https://github.com/jacob-macleod/Flashcard-App")
}

function DeveloperSection() {
    return (
        <div className='developer-section-container'>
            <div className='open-source-container'>
                <Image url={githubLogo} width="67px" height="67px" paddingBottom='16px'/>
                <p className='open-source-header'>Free & open-source</p>
                <p className='open-source-text'>
                    We believe in freedom and are committed
                    to the open-source community. Visit our GitHub page
                    and make a contributions to the project - licensed under
                    the permissive MIT license.
                </p>
                <Button text="Visit our GitHub" onClick={handleClick} style={{margin: "initial", marginTop: "16px"}}/>
            </div>
            <div className='open-source-footer'>
                <Image url={darkGithubLogo} width="32px" height="32px"/>
                <a href='https://github.com/jacob-macleod/Flashcard-App' className='open-source-footer-link'>We're open source! Take a look at our GitHub page.</a>
            </div>
        </div>
    );
}

export default DeveloperSection;