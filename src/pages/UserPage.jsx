import React from 'react'
import Navbar from '../components/Navbar'
import defBgImg from "/defaultprofilebackground.jpg"
import style from "./UserPage.css"
import Button from '../components/Button'

function User(props) {
    let path = window.location.pathname
    path = path.split("/")

    let userProfile = path[2]
    userProfile = props.allUsers.find(user => user.id === userProfile)
    
    let userPosts = props.posts.filter(user => {
      if (user.domain === userProfile.id){
        return true
      } else false
    })

    console.log(userPosts)

    function createUserProfile(){
      return (
        <div className='createUserProfile--Container'>
          <Navbar />
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
              <div className="interact-share--container">
                <Button color={"white button"} text={"Unfollow"}>
                  Unfollow
                </Button>
                <Button 
                color={"white button small"}
                text={<i class="fa-solid fa-share"></i>}></Button>
              </div>
            </div>
          </div>
        </div>
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