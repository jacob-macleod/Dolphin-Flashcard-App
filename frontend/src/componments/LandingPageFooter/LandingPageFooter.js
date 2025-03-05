import React from 'react';

import './LandingPageFooter.css';
import DolphinLogo from '../Logos/DolphinLogo/DolphinLogo';
import Paragraph from '../Text/Paragraph';
import Mailchimp from '../Mailchimp/Mailchimp';
import MailChimpInput from '../../containers/MailChimpWidget/MailChimpInput';
import twitterLogo from '../../static/twitter.png';
import githubLogo from '../../static/github-logo.png';
import Image from '../Image';

function FooterHeader({ text }) {
  return (
    <p
      style={{
        color: '#6A84C5',
        fontSize: '21px',
        fontWeight: '700',
      }}
    >
      {text}
    </p>
  );
}

function LandingPageFooter({ width, view }) {
  // Construct the email programatically to stop evil web crawlers from spamming the email
  const emailName = 'dolphinflashcards';
  const emailDomain = 'outlook.com';
  const dolphinEmail = `${emailName}@${emailDomain}`;

  return (
    <div
      className="landing-page-footer"
      style={{ width: width, marginBottom: '-1000px' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: view === 'mobile' ? '1fr ' : '1fr 1fr',
          gridTemplateRows: view === 'mobile' ? '1fr 1fr' : '1fr',
          width: view === 'mobile' ? 0.8 * width : 0.6 * width,

          margin: '48px auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            width: '370px',
          }}
        >
          <span
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <DolphinLogo />
            <FooterHeader text="Dolphin Flashcards" />
          </span>
          <Paragraph
            text={'Sign up to our newsletter to be notified when we launch!'}
            style={{
              color: '#BABABA',
              lineHeight: '30px',
              textAlign: 'start',
            }}
          />
          <MailChimpInput enableDarkMode={true} />
        </div>
        <div style={{ textAlign: 'start' }}>
          <div>
            <FooterHeader text="Contact us" />
            <p
              style={{
                color: '#bababa',
                lineHeight: '30px',
                textAlign: 'start',
                fontSize: '16px',
              }}
            >
              Email:{' '}
              <a
                href={`mailto:${dolphinEmail}`}
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: 'white' }}
              >
                <u>{dolphinEmail}</u>
              </a>
            </p>
          </div>
          <div>
            <FooterHeader text="Socials" />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <a
                href="https://github.com/jacob-macleod/Dolphin-Flashcard-App"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <Image
                  width={'100%'}
                  height={32}
                  url={githubLogo}
                  objectFit="contain"
                  style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
                />
              </a>
              <a
                href="https://x.com/dolphinflshcrds"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <Image
                  width={'100%'}
                  height={32}
                  url={twitterLogo}
                  objectFit="contain"
                  style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageFooter;
