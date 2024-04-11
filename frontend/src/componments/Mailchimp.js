/*
Author: @BearCooder, @vladuma
Taken and refactored from https://github.com/gndx/react-mailchimp-form/issues/38
*/
import React, { useState } from "react";
import {motion} from 'framer-motion';
import jsonp from "jsonp";
import './Button.css'

const defaultMessages = {
  sending: "Sending...",
  success: "Thank you for subscribing!",
  error: "An unexpected internal error has occurred.",
  empty: "You must write an e-mail.",
  duplicate: "Too many subscribe attempts for this email address",
  button: "Subscribe!"
};

const Mailchimp = ({
  action,
  messages = {},
  fields,
  styles,
  className,
  buttonClassName,
  view
}) => {
  const [state, setState] = useState({});
  const [status, setStatus] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const values = fields.map(field => `${field.name}=${encodeURIComponent(state[field.name])}`).join("&");
    const path = `${action}&${values}`;
    const url = path.replace('/post?', '/post-json?');
    const regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
    const email = state['EMAIL'];

    if (!regex.test(email)) {
      setStatus("empty");
    } else {
      sendData(url);
    }
  };

  const sendData = (url) => {
    setStatus("sending");
    jsonp(url, { param: "c" }, (err, data) => {
      if (err || data.result !== 'success') {
        setStatus('error');
      } else if (data.msg.includes("already subscribed")) {
        setStatus('duplicate');
      } else {
        setStatus('success');
      }
    });
  };

  const mergedMessages = { ...defaultMessages, ...messages };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {fields.map(input => (
        <input
          {...input}
          key={input.name}
          className={view == "mobile" ? "input-mobile" : "input"}
          onChange={({ target }) => setState({ ...state, [input.name]: target.value })}
          defaultValue={state[input.name]}
        />
      ))}
      <motion.button
        disabled={status === "sending" || status === "success"}
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={status === "sending" || status === "success" ? "button-disabled" : "button" }
      >
        {mergedMessages.button}
      </motion.button>
      <div className='msg-alert'>
        {status === "sending" && <p style={styles?.sendingMsg}>{mergedMessages.sending}</p>}
        {status === "success" && <p style={styles?.successMsg}>{mergedMessages.success}</p>}
        {status === "duplicate" && <p style={styles?.duplicateMsg}>{mergedMessages.duplicate}</p>}
        {status === "empty" && <p style={styles?.errorMsg}>{mergedMessages.empty}</p>}
        {status === "error" && <p style={styles?.errorMsg}>{mergedMessages.error}</p>}
      </div>
    </form>
  );
};

export default Mailchimp;
