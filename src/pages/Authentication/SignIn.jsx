import React, { useEffect, useState } from "react";
import "./authentication.scss";
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
import { message } from "antd";

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
    sendSignInLinkToEmail(auth, email, {
      // link to which user will be redirected
      url: "https://authenti-ai.netlify.app/",
      handleCodeInApp: true,
    })
      .then(() => {
        window.localStorage.setItem("emailSolocl", email);
        setAlertHelper("primary", "Sign In Link Sent To Email");
        setEmail("");
        message.info("Please check your mail for the link to login.");
      })
      .catch((err) => {
        setAlertHelper("alert", "Sign In Link Error ..!!");
        console.log("send sign in link err", err);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((data) => {
        setAlertHelper("success", "Sign In Successful");
      })
      .catch((err) => {
        console.log("Google Sign In Error : ", err);
      });
  };

  return (
    <div className="signInOuterCover">
      <div className="signInContainer">
        <div className="title-container">
          <img
            src="login_banner.jpg"
            alt="Star "
            className="signinpage-image"
          />
        </div>
        <div className="signInform-container">
          <div className="signInHeading">
            <h2>Welcome</h2>
            <p className="text-signin-box">
              Sign in to access{" "}
              <span style={{ color: "#572ade" }}>
                <b>Authenti AI</b>
              </span>{" "}
              service
            </p>
          </div>
          <form onSubmit={onSumbitHandler} id="SignInformId">
            <button
              type="button"
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "none",
                color: "black",
                fontWeight: "600",
              }}
              id="googleButton"
              className={
                user
                  ? "hollow button primary btn btn-dark disabled signinGooglebtn"
                  : "hollow button primary btn btn-dark signinGooglebtn"
              }
              onClick={handleGoogleSignIn}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                style={{
                  width: "20px",
                  height: "20px",
                  flexShrink: 0,
                  marginRight: "7px",
                }}
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              <span style={{ marginLeft: "5px" }}>Sign in with Google</span>
            </button>
            <div className="lineBreakAuth">
              <hr className="hrDown" />

              <h6 style={{ color: "grey" }}>OR</h6>
              <hr className="hrDown" />
            </div>
            <input
              id="SignInFormInput"
              type="email"
              required
              className="email-input-sigin"
              placeholder="Enter your email address"
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
              className={
                user
                  ? "btn btn-primary disabled signin-btn"
                  : "btn btn-primary signin-btn"
              }
            >
              Sign In
            </button>
          </form>
          <p style={{ marginTop: "20px", fontSize: "10px" }}>
            <span style={{ color: "#572ade" }}>
              <b>Authenti AI</b>
            </span>{" "}
            , Power your product authentication with our AI Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
