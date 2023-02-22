import "./Main.css"
import React from 'react'
import Button from '../components/Button';
import Navbar from "../components/Navbar"
import defaultImage from "/defaultimage.jpg"
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import createPosts from '../helper/CreatePosts';
import { collection, doc, setDoc, } from 'firebase/firestore';

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {v4} from "uuid"

function Main(props) {
  const [commentsToPost, setCommentsToPost] = React.useState([])
  const [makeAPost, setMakeAPost] = React.useState(false)

  let navigate = useNavigate();

  function signUp(){
    if (!props.loggedIn){
      navigate("../signup")
    }
  }

  function signedInDiv(){
    return (
      <div className="your-profile-info-container">
        <div className="yourprofileinnercontainer">
          <div className="yourinfo-container-image">
            <img
              onClick={() => navigate(`./user/${props.user}`)}
              src={defaultImage}
              className="yourinfo-image clickable"
            ></img>
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
          <div onClick={() => setMakeAPost(true)} className="makenewpost">
            <p>
              <i className="fa-solid fa-plus clickable"></i>
            </p>
            <p>New Post</p>
          </div>
        </div>
      </div>
    );
  }

  function goToProfile(event){
      navigate(`/user/${event}`)
  }


  const [imageUpload, setImageUpload] = React.useState(null)
  function newPost(){
    let existingUser = props.allUsers.find(
      (person) => person.domain === props.user
    );

    let caption = document.querySelector(".entercaption").value
    
    // let posturl = false
    const uploadImage = () => {
      const storage = getStorage();
      const imageUserRef = ref(storage, `${props.user}/${imageUpload.name + v4()}`);
      uploadBytes(imageUserRef, imageUpload)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((res) => makePost(res));
        })
    }
    uploadImage()

    const makePost = async (res) => {
      const sendNewUserPost = collection(
        db,
        `users/`
      );
      const userRef = doc(db, `users/${v4()}`)
      const id = userRef.id
      const userData = {
        id,
        uniqueid: id,
        likes: 0,
        post: res,
        profilepicture: existingUser.profilepicture,
        caption: caption,
        username: existingUser.name,
        hearted: false,
        domain: props.user,
        time: Date.now(),
        likedby: [],
      };
      await setDoc(userRef, userData 
      ).then(() => props.refreshPage("Refresh posts too"));
    };
    
  }

  function createPostModal(){
    return (
      <div className="post-modal--container">
      <div className="inner-post-modal-container">
        <div className="exitModal">
          <button onClick={() => setMakeAPost(false)} className="exitmodal-button">X</button>
          </div>
        <h1>Create New Post</h1>
        <hr />
        <input className="input--post-file" type="file" name="file" id="file" onChange={() => setImageUpload(event.target.files[0])}/>
        <textarea name="enter caption" className="entercaption" cols="25" rows="5" placeholder="Enter a caption..."></textarea>
        <button 
        onClick={() => {
          setMakeAPost(false)
          newPost()
        }}
        className="post--button">Post</button>
      </div>
      </div>
    )
  }

  const [locked,setLocked] = React.useState(false)
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
        props.usersLikedPosts,
        props.updateLikedBy,
        setLocked,
        locked
      )
    );
  }

  if (makeAPost){
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("body").style.overflow = "hidden"
  } else {
    document.querySelector("body").style.overflow = "auto";
  }
  
  return (
    <div className="main--container">
      <Navbar user={props.user} />
      <div className="content--div">
        <div className="main--content">{homepagePosts}</div>
        <div className="signup-login--container">
          {props.loggedIn ? (
            signedInDiv()
          ) : (
            <>
              <Button
                onclick={() => signUp()}
                text="Sign up"
                color="black button"
              />
              <Button
                onclick={() =>
                  props.login(
                    props.allUsers,
                    props.setUser,
                    props.setLoggedIn,
                    navigate
                  )
                }
                text="Login"
                color="white button"
              />
            </>
          )}
        </div>
      </div>
      {makeAPost && createPostModal()}
      <div className="iconby">
        Instagram icon from &nbsp;
        <a
          href="https://www.flaticon.com/free-icons/instagram"
          title="instagram icons"
        >
          Instagram icons created by Freepik - Flaticon
        </a>
      </div>
    </div>
  );
}

export default Main