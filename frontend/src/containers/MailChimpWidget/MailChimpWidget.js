import React, { useState } from 'react';
import Subheader from '../../componments/Text/Subheader/Subheader';
import BentoPanel from '../BentoPanel/BentoPanel';
import Mailchimp from '../../componments/Mailchimp/Mailchimp';

import './MailChimpWidget.css';
import MailChimpInput from './MailChimpInput';

let mailChimpApiKey = '';

try {
  const { default: apiKey } = require('../../api/secretKeys');
  mailChimpApiKey = apiKey;
} catch (error) {
  console.error('Error loading mailChimpApiKey:', error);
}

function MailChimpWidget({ view }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Submitted:', email);
    // Clear the input after submission
    setEmail('');
  };

  return (
    <BentoPanel
      item1={
        <>
          <Subheader text="Want to stay updated? Subscribe to our newsletter!" />
          <MailChimpInput />
        </>
      }
    />
  );
}

export default MailChimpWidget;
