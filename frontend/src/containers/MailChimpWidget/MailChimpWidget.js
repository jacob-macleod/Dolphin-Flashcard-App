import React, { useState } from 'react';
import Subheader from '../../componments/Text/Subheader/Subheader';
import BentoPanel from '../BentoPanel';
import Mailchimp from "../../componments/Mailchimp/Mailchimp";

let mailChimpApiKey = "";

try {
  const { default: apiKey } = require('../../api/secretKeys');
  mailChimpApiKey = apiKey;
} catch (error) {
  console.error('Error loading mailChimpApiKey:', error);
}

function MailChimpWidget({view}) {
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
        item1={<>
            <Subheader text="Want to stay updated? Subscribe to our newsletter!"/>
            <Mailchimp
                action={mailChimpApiKey}
                fields={[
                    {
                        name: 'EMAIL',
                        placeholder: 'Email',
                        type: 'email',
                        required: true
                    }
                ]}
                messages={{
                    sending: "Sending...",
                    success: "Thank you for subscribing!",
                    error: "An unexpected internal error has occurred",
                    empty: "You must write an e-mail",
                    duplicate: "Too many subscribe attempts for this email address",
                    button: "Subscribe"
                }}
                className="mailchimp-form"
            />
        </>}
    />
  );
}

export default MailChimpWidget;
