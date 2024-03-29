import React, { useEffect, useState } from "react";
import "./authentication.scss";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/Firebase/firebase";
import Alert from "../Alert/Alert";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const Authentication = () => {
  const [user, loading, error] = useAuthState(auth);
  const [alertFunctionality, setAlertFunctionality] = useState({
    display: false,
    type: "success",
    message: "Sign In Successful",
  });

  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, [user]);

  return (
    <>
      {!user ? (
        <>
          {alertFunctionality.display && (
            <Alert
              type={alertFunctionality.type}
              message={alertFunctionality.message}
            />
          )}

          <div className="authContainer">
            <SignIn
              alertFunctionality={alertFunctionality}
              setAlertFunctionality={setAlertFunctionality}
            />
          </div>
        </>
      ) : (
        <div>
          <Spin />
        </div>
      )}
    </>
  );
};

export default Authentication;
