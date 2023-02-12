import React from 'react'
import Navbar from '../components/Navbar'
import style from "./Signup.css"
import Button from '../components/Button'
import image from "/instagramimage.png"
import { useNavigate } from "react-router-dom";
import { db } from '../services/firebase'
import { collection, addDoc } from "firebase/firestore";




import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function Signup(props) {
  const [username, setUsername] = React.useState([])

  let tooShortUsernameInput = document.querySelector(".input-username");

  let navigate = useNavigate()

  //successfull signup
    const usersCollectionRef = collection(db, "usercollection");

  
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
        console.log(user, "**")
        const createUser = async () => {
          await addDoc(usersCollectionRef, {
            name: user.displayName,
            domain: username,
            profilepicture:
              "https://firebasestorage.googleapis.com/v0/b/instagram-38d7b.appspot.com/o/Zawantewilliams%2Fgratisography-frog-racer-free-stock-photo.jpg?alt=media&token=1e1955a1-d055-4685-8a94-0a1cbeddb46d",
            followers: 0,
            following: 1,
            bio: "",
            posts: 0
          });
        }; 
        // console.log(user.displayName)
        createUser()
        props.setUser(username)
        props.setLoggedIn(true)
        navigate("../")
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