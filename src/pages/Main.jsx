import "./Main.css"
import React from 'react'
import Button from '../components/Button';
import Navbar from "../components/Navbar"
import defaultImage from "/defaultimage.jpg"
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import createPosts from '../helper/CreatePosts';
import { collection, getDocs } from 'firebase/firestore';

function Main(props) {
  const [commentsToPost, setCommentsToPost] = React.useState([])

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
      navigate(`/user/${id}`)
  }

  let homepagePosts
  if (props.posts) {
    homepagePosts = props.posts.map((post, index) =>
      createPosts(
        post,
        goToProfile,
        props.eachPostComments[index],
        navigate,
        setCommentsToPost,
        commentsToPost,
        props.user,
        props.refreshPage,
        props.usersLikedPosts
      )
    );
  }
  
  return (
    <div className="main--container">
      <Navbar user={props.user} />
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