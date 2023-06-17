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
          <img src="login_banner.jpg" alt="Star " className="signinpage-image" />
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
                background: "#4285F4",
                color: "white",
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
              <img
                width="15px"
                alt="Google login"
                style={{ background: "white", padding: "3px", width: "28px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
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
          <p style = {{marginTop: "20px", fontSize: "10px"}}>
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
