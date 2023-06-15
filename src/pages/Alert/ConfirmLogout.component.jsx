import React from 'react'

const ConfirmLogoutAlert = () => {

 const type="warning"
 const message="Confirm logut? "
 const signOutFunction = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signed Out User");
        localStorage.removeItem("emailSolocl");
        nav("/auth");
        logoutAlertHandler();
      })
      .catch((err) => {
        console.log("Error in sign out ", err);
      });
  };
//  const setConfirmLogoutButton
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
          setConfirmLogoutButton(false);
          signOutFunction();
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
  )
}

export default ConfirmLogoutAlert