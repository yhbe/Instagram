import React from 'react'
import styles from "./Main.css"
import Button from '../components/Button';
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom';
import image from "/more-hori.svg"

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

  function signedInDiv(){
    return (
      <>
        <h2>Hello</h2>
        <p>{props.user}</p>
      </>
    )
  }

  function createPosts(post){
    return (
      <div className="instagram--post">
        <div className="instagram--post-header">
          <div className="header-left">
            <img
              className="post--profile-picture"
              src={post.profilepicture}
            ></img>
            <div className="header-left-text">
              <p>{post.username}</p>
              <p>@{post.domain}</p>
            </div>
          </div>
          <img src={image}></img>
        </div>
        <div className="instagram--post-image">
          <img className="image" src={post.post}></img>
        </div>
        <div className="instagram--post-footer">
          <div className="interact-row">
            <div className="heart-comment-share">
              <i class="fa-regular fa-heart"></i>
              <i class="fa-regular fa-comment"></i>
              <i class="fa-regular fa-share-from-square"></i>
            </div>
            <i class="fa-solid fa-link"></i>
          </div>
          <p>54 Likes</p>
          <div className="comments--row">
            <p>view all comments</p>
            <p>
              <strong>samCho</strong> Great Picture
            </p>
            <p>
              <strong>ryanlyn</strong> We had a great night!
            </p>
          </div>
        </div>
      </div>
    );
  }

  let homepagePosts
  if (props.posts) {
    homepagePosts = props.posts.map(post => createPosts(post))
  }
  
  return (
    <div className="main--container">
      <Navbar />
      <div className='content--div'>
      <div className='main--content'>
      {homepagePosts}
      </div>
      <div className='signup-login--container'>
        {props.loggedIn ? 
        signedInDiv() :
        <>
        <Button onclick={() => signUp()} text="Sign up" color="black button"/>
        <Button onclick={() => login()} text="Login" color="white button"/>
        </>}
      </div>
      </div>
    </div>
  );
}

export default Main