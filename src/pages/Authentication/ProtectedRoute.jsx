import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const ProtectedRoute = ({ Component }) => {
  const [user, loading, error] = useAuthState(auth);
  const runOnce = useRef(true);
  const nav = useNavigate();
  useEffect(() => {
    if (runOnce.current) {
      if (!user) {
        nav("/");
      }
    }
    return () => {
      runOnce.current = false;
    };
  }, [user]);

  return <Component />;
};

export default ProtectedRoute;
