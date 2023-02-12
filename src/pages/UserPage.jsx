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
        <>
          <div className="createUserProfile--Container">
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
                    text={<i class="fa-solid fa-share"></i>}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
          <div className="userbottom--half-container">
   <div className="moreuserinformationo--posts--container">
              <div className="userinformation--container">
                <h1 className="userprofile-name">{userProfile.name}</h1>
                <p className="userprofile--domain">@{userProfile.domain}</p>
                <div className="amount-of-posts larger">
                  <h4 className='large'>6</h4>
                  <p className="post-text">Posts</p>
                </div>
                <hr />
                <div className="following--followers-container larger">
                  <div className="following">
                    <p className="following--amount large">5</p>
                    <p className="following-text">Following</p>
                  </div>
                  <div className="followers larger">
                    <p className="follower--amount large">213</p>
                    <p className="followers-text">Followers</p>
                  </div>
                </div>
                <hr />
                <div className="bio-container larger">
                  <p className="bio-text large">Bio</p>
                  <p className="fullbio">California</p>
                </div>
              </div>
            </div>
          <div className="posts--container">
            Here
          </div>
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