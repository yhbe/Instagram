import React from 'react'
import Navbar from '../components/Navbar'
import defBgImg from "/defaultprofilebackground.jpg"
import style from "./UserPage.css"
import Button from '../components/Button'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function User(props) {
  console.log(props)
  let path = window.location.pathname
  path = path.split("/")
  
  let userProfile = path[2]
  userProfile = props.allUsers.find(user => user.domain === userProfile)
  
  let userPosts = props.posts.filter(user => {
    if (user.domain === userProfile.domain){
      return true
    } else false
  })
  console.log(userPosts)
  
  let navigate = useNavigate();

    function navigateUserPost(id){
      navigate(`${id}`)
    }

    function showPostPreview(post){
      let id = post.uniqueid
      return (
        <div
          onClick={() => navigateUserPost(id)}
          className="postpreview--main-container"
        >
          <img
            className="postpreview-image"
            src={post.post}
            alt="instagram post"
          />
        </div>
      );
    }

    userPosts = userPosts.map(post => showPostPreview(post))

    let showUnfollow = true

    if (userProfile.domain === props.user){
      showUnfollow = false
    }
    function createUserProfile(){
      return (
        <>
          <div className="createUserProfile--Container">
            <Navbar user={props.user} />
            <div className="headerimage--container">
              <img
                className="user-header-background-image"
                src={defBgImg}
                alt="colorful sky"
              />
            </div>
            <div className="userProfile--main-container">
              <div className="profile-pic--interact-share">
                <div className="profilePictureContainer">
                  <img
                    className="profile-picture"
                    src={userProfile.profilepicture}
                    alt="profile picture"
                  />
                </div>
                {showUnfollow && (
                  <div className="interact-share--container">
                    <Button color={"white button"} text={"Unfollow"}>
                      Unfollow
                    </Button>
                    <Button
                      color={"white button small"}
                      text={<i class="fa-solid fa-share"></i>}
                    ></Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="userbottom--half-container">
            <div className="moreuserinformationo--posts--container">
              <div className="userinformation--container">
                <h1 className="userprofile-name">{userProfile.name}</h1>
                <p className="userprofile--domain">@{userProfile.domain}</p>
                <div className="amount-of-posts larger">
                  <h4 className="large">{userProfile.posts}</h4>
                  <p className="post-text">Posts</p>
                </div>
                <hr />
                <div className="following--followers-container larger">
                  <div className="following">
                    <p className="following--amount large">
                      {userProfile.following}
                    </p>
                    <p className="following-text post-text">Following</p>
                  </div>
                  <div className="followers larger">
                    <p className="follower--amount large">
                      {userProfile.followers}
                    </p>
                    <p className="followers-text post-text">Followers</p>
                  </div>
                </div>
                <hr />
                <div className="bio-container larger">
                  <p className="bio-text large">Bio</p>
                  <p className="fullbio">{userProfile.bio}</p>
                </div>
              </div>
            </div>
            <div className="posts--main-container">{userPosts}</div>
          </div>
        </>
      );
    }
    
  return (
    <>
    {userProfile && createUserProfile()}
    {!userProfile &&  <h1>Coal</h1>}
    </>
  )
}

export default User