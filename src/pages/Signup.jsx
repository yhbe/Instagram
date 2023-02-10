import React from 'react'
import Navbar from '../components/Navbar'
import style from "./Signup.css"
import Button from '../components/Button'
import image from "/instagramimage.png"


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function Signup(props) {
  const [username, setUsername] = React.useState([])
  const [validUsername, setValidUsername] = React.useState(false)

  let tooShortUsernameInput = document.querySelector(".input-username");
  
  function verifyGoogleAccount(){
    if (username.length < 3) return tooShortUsernameInput.classList.add("error")
    const provider = new GoogleAuthProvider();
    console.log("Verifying")
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        props.setUser(username)
        props.setLoggedIn(true)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className='signup--main'>
    <Navbar />
    <div className='signup--content-div'>
    <div className='signup--content-inner-div'>
      <div className='logo-text-div'>
    <img className='instagram-logo' src={image}></img>
    <h1>Sign Up</h1>
      </div>
      <div className='input--text-div'>
        <div className='signup--input'>
        <p className='input--at'>@</p>
        <input className='input-username' type="text"   placeholder='username' minLength={3} maxLength={15} onChange={(event) => setUsername(event.target.value)}/>

        </div>
    <p className='limit-range-text'>Name must be 3-15 characters.</p>
      </div>
    
    <div className='button--container'>
      <Button onclick={() => verifyGoogleAccount()} text={"Sign Up With Google"} color={"gray button"}/>
      <p className='signup--text'>Already Signed up?</p>
      <Button text={"Login"} color="gray outline button"/>
    </div>

    </div>
    </div>
    </div>
  )
}

export default Signup