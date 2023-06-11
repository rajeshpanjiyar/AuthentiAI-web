import "./Support.scss";
import React, { useRef , useState } from 'react';
import emailjs from '@emailjs/browser'; 

// const Card = props => (
//     <div className="support-card">
//       {/*<div className="waves">
//       </div>*/}
//       {props.children}
//     </div>
//   );


  
//   const Form = props => (
//     <form className="support-form"
//     ref={form} 
//     onSubmit={sendEmail}
//     >{props.children}</form>
//   );


  
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
  
//   const Button = props => (
//     <button
//       className="button">{props.children}</button>
//   );
  
  /** Root Component */
  

const Support = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm(
      'process.env.REACT_APP_EMAILJS_SERVICE_ID'
      , 
       'process.env.REACT_APP_EMAILJS_TEMPLATE_ID'
      , form.current, 'process.env.REACT_APP_EMAILJS_PUBLIC_KEY')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }; 
  const [state, setState] = useState({
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
  });

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
    <div className="support-container">

    <div className="support-title">
        <h1 className="support-h1">
        Let us guide you every step of the way - our support team is here to help .
        </h1>
    </div>
     
     <div className="support-text">
        <p className="suppor-para-text">
            Reach out to us with any questions or concerns you may have or if you want to use our service in your use case. We are here to help you.
        </p>
     </div>


      <div className="support-card">
        {/* <Card> */}
        <h1>Send us a Message!</h1>
        {/* <Form> */}
        <form action="" className="support-form"
        onSubmit={sendEmail}
        ref={form}
        >
          <TextInput
            {...name}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <TextInput
            {...email}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <TextArea
            {...message}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        <button className="support-button">
            Send
        </button>
        {/* </Form> */}
        </form>
      {/* </Card> */}
      </div>
    </div>
  );
};

export default Support;