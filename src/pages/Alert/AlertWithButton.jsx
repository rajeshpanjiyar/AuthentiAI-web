import React from "react";
import './AlertWithButton.styles.css'

const AlertWithButton = ({ type, message, signOutFunction, setConfirmLogoutButton}) => {
  return (
    <div>
      <div
      id = "ALB-alertBox"
        className={`alert alert-${type}`}
        role="alert"
      >
        <span>{message}</span>{" "}
        <button
          className="btn btn-success"
          style={{
            height: "20px",
            display: "flex",
            justifyContent: "centre",
            alignItems: "center",
            marginLeft: "10px",
          }}
          onClick={()=>{
            setConfirmLogoutButton(false)
            signOutFunction()
          }}
        >
          Yes
        </button>
        <button
          className="btn btn-danger"
          style={{
            height: "20px",
            display: "flex",
            justifyContent: "centre",
            alignItems: "center",
            marginLeft: "10px",
          }}
          onClick={()=>{
            setConfirmLogoutButton(false)
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default AlertWithButton;
