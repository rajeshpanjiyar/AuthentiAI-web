import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Fragment } from 'react';
const Error = () => {

  const nav = useNavigate();

  return (
    <Fragment>
    <div style={{position:"absolute",top:"20%",left:"40%"}}>
        
        <h2>404 Error Page {' :('} </h2>
        <p style={{textAlign:"center"}}>Sorry, This page doesn't exist</p>
        <button className='btn btn-danger' onClick={()=>{
          nav("/")
        }}>

          Go Back To Home Page {" :)"}
          </button>

    </div>
    </Fragment>
  )
}

export default Error;