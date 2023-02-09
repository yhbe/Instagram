import React from 'react'
import styles from "./Main.css"
import Button from '../components/Button';
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom';

function Main(props) {
  let [signUpButtonClick, setSignUpButtonClick] = React.useState(false)

  let navigate = useNavigate();

  function signUp(){
    if (!props.loggedIn){
      setSignUpButtonClick(true)
    }
    navigate("../signup")
  }

  function login(){
    console.log("Logging in")
  }
  
  return (
    <div className="main--container">
      <Navbar />
      <div className='content--div'>
      <div className='main--content'>
      Content
      </div>
      <div className='signup-login--container'>
        <Button onclick={() => signUp()} text="Sign up" color="black button"/>
        <Button onclick={() => login()} text="Login" color="white button"/>
      </div>
      </div>
    </div>
  );
}

export default Main