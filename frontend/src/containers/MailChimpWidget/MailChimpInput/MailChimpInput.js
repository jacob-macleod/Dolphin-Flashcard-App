import React, { useState } from 'react';
import Mailchimp from '../../../componments/Mailchimp/Mailchimp';

import './MailChimpInput.css';

let mailChimpApiKey = '';

try {
  const { default: apiKey } = require('../../../api/secretKeys');
  mailChimpApiKey = apiKey;
} catch (error) {
  console.error('Error loading mailChimpApiKey:', error);
}

function MailChimpInput({ enableDarkMode = false }) {
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
    <Mailchimp
      action={mailChimpApiKey}
      fields={[
        {
          name: 'EMAIL',
          placeholder: 'Email',
          type: 'email',
          required: true,
        },
      ]}
      messages={{
        sending: 'Sending...',
        success: 'Thank you for subscribing!',
        error: 'An unexpected internal error has occurred',
        empty: 'You must write an e-mail',
        duplicate: 'Too many subscribe attempts for this email address',
        button: 'Submit',
      }}
      className={enableDarkMode ? 'mailchimp-form-dark' : 'mailchimp-form'}
    />
  );
}

export default MailChimpInput;
