import React from 'react';

import './LandingPageFooter.css';
import DolphinLogo from '../Logos/DolphinLogo/DolphinLogo';
import Paragraph from '../Text/Paragraph';
import Mailchimp from '../Mailchimp/Mailchimp';
import MailChimpInput from '../../containers/MailChimpWidget/MailChimpInput';

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
  return (
    <div
      className="landing-page-footer"
      style={{ width: width, marginBottom: '-1000px' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
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
                color: 'white',
                lineHeight: '30px',
                textAlign: 'start',
                fontSize: '16px',
              }}
            >
              Email: <u>dolphinflashcards@outlook.com</u>
            </p>
          </div>
          <div>
            <FooterHeader text="Socials" />
            <Paragraph
              text={'Email: dolphinflashcards@outlook.com'}
              style={{
                color: '#BABABA',
                lineHeight: '30px',
                textAlign: 'start',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageFooter;
