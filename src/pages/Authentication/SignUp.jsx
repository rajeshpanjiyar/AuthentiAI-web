import React, { useState } from "react";
import './auth.styles.css'

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({ userName: "", email: "" });
  const signUpFormChangeHandler = (event) => {
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };

  const SignUpFormSumbitHandler = (event) => {
    event.preventDefault();
    console.log("SignUpFormSumbitHandler Data: ",signUpData);
    setSignUpData({ userName: "", email: "" });
  };

  return (
    <div className="SignUpFormConatiner">
      <h2>Don't have an account ?</h2>
      <p>Sign Up With User Name and Email</p>
      <form onSubmit={SignUpFormSumbitHandler} id="SignUpformId">
        <div className="input-group flex-nowrap">
          <input
            type="text"
            required
            className="form-control"
            placeholder="Enter Your User Name"
            aria-label="User Name "
            aria-describedby="addon-wrapping"
            value={signUpData.userName}
            onChange={signUpFormChangeHandler}
            name="userName"
          />
        </div>
        <div className="input-group flex-nowrap" style={{marginTop:'5px'}}> 
          <input
            type="email"
            required
            className="form-control"
            placeholder="Enter Your Email Id"
            aria-label="Email Id"
            aria-describedby="addon-wrapping"
            value={signUpData.email}
            onChange={signUpFormChangeHandler}
            name="email"
          />
        </div>
        <button style={{marginLeft:'85%', marginTop:"4px"}} type="submit" className="btn btn-outline-success">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
