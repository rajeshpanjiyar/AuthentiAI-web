import React, { useEffect, useState } from "react";

const Alert = ({type, message}) => {

  return (
    
     
        <div className={`alert alert-${type}`} style={{zIndex:"1", height:"5vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"start"}} role="alert">
         {message}
        </div>
      

  );
};

export default Alert;
