import React, { useEffect, useState } from "react";
import "./auth.styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleAuthProvider } from "../utility/Firebase/firebase";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";


const SignIn = ({ alertFunctionality, setAlertFunctionality }) => {
  const nav = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const { search } = location;

  const setAlertHelper = useCallback((type, message) => {
    // call alert
    setAlertFunctionality({
      display: true,
      type: type,
      message: message,
    });
    // remove alert
    setTimeout(() => {
      setAlertFunctionality({
        display: false,
        type: type,
        message: message,
      });
    }, 2000);
  });

  useEffect(() => {
    // if (user) {
    //   nav("/home");
    // }

    if (!user && window.localStorage.getItem("emailSolocl")) {
      // is user is not logged in but the link is still valid
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let emailCheck = window.localStorage.getItem("emailSolocl");
        if (!emailCheck) {
          emailCheck = window.prompt(
            "Please provide your email for confirmation"
          );
        }
        // window.location.href
        signInWithEmailLink(auth, emailCheck, window.location.href)
          .then((res) => {
            console.log("From sign in with email", emailCheck, " => ", res);
            localStorage.removeItem("emailSolocl");
            setAlertHelper("success", "Sign In Successful");
          })
          .catch((err) => {
            console.log("Error in email sign in", err);
            setAlertHelper("Danger", "Sign In Failed");
          });
      }
    }
  }, [user, search, nav, setAlertHelper]);

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onSumbitHandler = (event) => {
    event.preventDefault();
    console.log("Sign In Form Submit : ", email);
    sendSignInLinkToEmail(auth, email, {
      // link to which user will be redirected
      url: "http://localhost:3000/",
      handleCodeInApp: true,
    })
      .then(() => {
        window.localStorage.setItem("emailSolocl", email);
        setAlertHelper("primary", "Sign In Link Sent To Email");
        setEmail("");
      })
      .catch((err) => {
        setAlertHelper("alert", "Sign In Link Error ..!!");
        console.log("send sign in link err", err);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((data) => {
        console.log("Google Sign In Data", data);
        setAlertHelper("success", "Sign In Successful");
      })
      .catch((err) => {
        console.log("Google Sign In Error : ", err);
      });
  };

  return (
    <div className="signInOuterCover">
      {/* <div className="signInCover"></div> */}
      <div className="signInContainer">
        <div className="signInHeading">
          <h2>Welcome</h2>
          <p>Log in to access Polymath Playground</p>
          {/* <hr className="hrDown" /> */}
        </div>
        <form onSubmit={onSumbitHandler} id="SignInformId">
          <button
            type="button"
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
       
           
            }}
            id="googleButton"
            className={
              user
                ? "hollow button primary btn btn-dark disabled"
                : "hollow button primary btn btn-dark"
            }
            onClick={handleGoogleSignIn}
          >
            <img
              width="15px"
              alt="Google login"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            <span style={{ marginLeft: "5px" }}>Sign in with Google</span>
          </button>
          <div className="lineBreakAuth">
            <hr className="hrDown" />

            <h3 style={{color:"grey"}}>OR</h3>
            <hr className="hrDown" />
          </div>
          <input
            id="SignInFormInput"
            type="email"
            required
            placeholder="Enter Your Email Id"
            aria-label="Email Id"
            aria-describedby="addon-wrapping"
            value={email}
            onChange={onEmailChangeHandler}
          />
          <button
            type="submit"
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
       
           
            }}
            className={user ? "btn btn-primary disabled" : "btn btn-primary"}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
