import React from 'react'
import styles from "./Main.css"
import Button from '../components/Button';
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom';
import image from "/more-hori.svg"
import defaultImage from "/defaultimage.jpg"

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
      <div className="your-profile-info-container">
        <div className="yourprofileinnercontainer">
          <div className="yourinfo-container-image">
            <img src={defaultImage} className="yourinfo-image"></img>
          </div>
          <div className="yourinfo-text">
            <h2>Hello</h2>
            <p>{props.user}</p>
          </div>
        </div>
        <div className="yourinfo--footer">
          <div className="following">
            <p>1</p>
            <p>Following</p>
          </div>
          <div className="followers">
            <p>0</p>
            <p>Followers</p>
          </div>
          <div className="yourposts">
            <p>0</p>
            <p>Posts</p>
          </div>
          <div className="makenewpost">
            <p>
              <i class="fa-solid fa-plus"></i>
            </p>
            <p>New Post</p>
          </div>
        </div>
      </div>
    );
  }

  function goToProfile(event){
    let id =
      event.target.parentElement.parentElement.parentElement.parentElement.id;
      navigate(`/user/${id}`, {user: "hotdog"})
  }

  function createPosts(post){
    return (
      <div 
      id={post.domain}
      className="instagram--post">
        <div className="instagram--post-header">
          <div className="header-left">
            <img
              className="post--profile-picture"
              src={post.profilepicture}
            ></img>
            <div className="header-left-text">
              <p onClick={(event) => goToProfile(event)}>{post.username}</p>
              <p className="user-domain">@{post.domain}</p>
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
          <p className="likes">54 Likes</p>
          <div className="comments--row">
            <p className="view-all-comments">View All Comments</p>
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