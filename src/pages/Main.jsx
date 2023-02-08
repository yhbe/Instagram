import React from 'react'
import Button from '../components/Button';
import Navbar from "../components/Navbar"
import styles from "./Main.css"

function Main() {
  return (
    <div className="main--container">
      <Navbar />
      <div className='content--div'>
      <div className='main--content'>
      Content
      </div>
      <div className='signup-login--container'>
        <Button text="Sign up" color="black button"/>
        <Button text="Login" color="white button"/>
      </div>
      </div>
    </div>
  );
}

export default Main