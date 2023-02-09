import React from 'react'
import Navbar from '../components/Navbar'
import style from "./Signup.css"
import Button from '../components/Button'
import image from "/instagramimage.png"

function Signup() {
  return (
    <div className='signup--main'>
    <Navbar />
    <div className='content--div'>
    <div className='content--inner-div'>
      <div className='logo-text-div'>
    <img className='instagram-logo' src={image}></img>
    <h1>Sign Up</h1>
      </div>
      <div className='input--text-div'>
        <div className='signup--input'>
        <p className='input--at'>@</p>
        <input className='input-username' type="text"   placeholder='username' minLength={3} maxLength={15}/>

        </div>
    <p className='limit-range-text'>Name must be 3-15 characters.</p>
      </div>
    
    <div className='button--container'>
      <Button text={"Sign Up With Google"} color={"gray button"}/>
      <p className='signup--text'>Already Signed up?</p>
      <Button text={"Login"} color="gray outline button"/>
    </div>

    </div>
    </div>
    </div>
  )
}

export default Signup