import React, { useRef , useState } from 'react';
import emailjs from '@emailjs/browser'; 
import { Fragment } from "react";
import "./Support.scss";

  
  const TextInput = props => (
    <div
      className="support-text-input">
      <label
        className={(props.focus || props.value !== '') ? 'label-focus' : ''}
        htmlFor={props.name}>{props.label}</label>
      <input
        className={(props.focus || props.value !== '') ? 'input-focus' : ''}
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onInput={props.onInput}
        onFocus={props.onFocus}
        onBlur={props.onBlur} 
        required
        />
    </div>
  );
  
  const TextArea = props => (
    <div
      className="text-area">
      <label
        className={(props.focus || props.value !== '') ? 'label-focus' : ''}
        htmlFor={props.name}>{props.label}</label>
      <textarea
        className={(props.focus || props.value !== '') ? 'input-focus' : ''}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onInput={props.onInput}
        onFocus={props.onFocus}
        onBlur={props.onBlur} 
        required
        />
    </div>
  );
const initialState = {
  name: {
    name: 'name',
    label: 'Name',
    value: '',
    focus: false,
  },
  email: {
    name: 'email',
    label: 'Email',
    value: '',
    focus: false,
  },
  message: {
    name: 'message',
    label: 'Message',
    value: '',
    focus: false,
  },
}
const Support = () => {
    const form = useRef();
    const [state, setState] = useState(initialState);

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm(
      `${process.env.REACT_APP_EMAILJS_SERVICE_ID}`
      , 
       `${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`
      , form.current, `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`)
        .then((result) => {
          setState(initialState)
        }, (error) => {
            console.log(error.text);
        });
    }; 

  const handleFocus = (e) => {
    const name = e.target.name;
    const updatedState = { ...state[name], focus: true };
    setState({ ...state, [name]: updatedState });
  };

  const handleBlur = (e) => {
    const name = e.target.name;
    const updatedState = { ...state[name], focus: false };
    setState({ ...state, [name]: updatedState });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const updatedState = { ...state[name], value: e.target.value };
    setState({ ...state, [name]: updatedState });
  };

  const { name, email, message } = state;

  return (
    <Fragment>
    <div className="support-container">

    <div className="support-title">
        <h1 className="support-h1">
        Let us guide you every step of the way - our support team is here to help .
        </h1>
    </div>
     
     <div className="support-text">
        <p className="support-para-text">
            <b>Reach out to us with any questions or concerns you may have or if you want to use our service in your use case. We are here to help you.</b>
        </p>
     </div>


      <div className="support-card">
        <h1 className="sendMessage-title">Send us a Message!</h1>
        <form action="" className="support-form"
        onSubmit={sendEmail}
        ref={form}
        >
          <TextInput
            {...name}
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <TextInput
            {...email}
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <TextArea
            {...message}
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        <button className="support-button">
            Send
        </button>
        </form>
      </div>
    </div>
    </Fragment>
  );
};

export default Support;