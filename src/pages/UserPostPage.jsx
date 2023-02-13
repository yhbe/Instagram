import React from 'react'
import Navbar from '../components/Navbar'
import style from "./UserPostPage.css"
import { collection, getDocs } from "firebase/firestore";
import { db} from "../services/firebase";


function UserPostPage(props) {
  let getPostProp = props.posts
  let path = window.location.pathname;
  path = path.split("/")
  let postId = path[3]


  //if refreshed page makes a database call to get info instead of relying on passed props
  const usersPostCollectionRef = collection(db, "users");
  const [downloadPost, setDownloadPost] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      console.log("hi")
      const data = await getDocs(usersPostCollectionRef);
      console.log(data,data)
      setDownloadPost(data.docs.map((doc) => ({ ...doc.data() })));
    };
    getData();
  }, []);

  
  console.log(downloadPost)
  //

  let displayPost = downloadPost.find(post => post.uniqueid === postId)

    const usersCollectionRef = collection(db, `users/${postId}/usercomments`);

    const [comments, setComments] = React.useState([])

    React.useEffect(() => {
      const getData = async () => {
        const data = await getDocs(usersCollectionRef);
        setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getData();
    }, []);
    
    let sortUserComments;
    let commentJsx = []

    console.log(comments)

    if (comments.length > 0){
      sortUserComments = comments.map(comment => {
        let arr = []
        let user
          user = props.allUsers.find(user => {
            if (user.domain === comment.id) {
              user.comment = comment.comments
              arr.push(user);
            }
          })
        return arr
      })

      console.log(sortUserComments)

      let commentsArr = []

      sortUserComments.forEach(comment => {
        props.allUsers.find((user) => {
          if (user.domain === comment[0].domain) {
            commentJsx.push(comment[0].comment.map(userComment => createCommentJsx(user,userComment))) 
          }
        });
      })
    }
    function createCommentJsx(user,comment){
      return (
        <div className="user--comment-container">
          <div className="user--comment-image-container">
            <img
              className="user-comment-image"
              src={user.profilepicture}
              alt="profile picture"
            />
          </div>
          <p className='username--'>
            <strong>{user.name}</strong>
          </p>
          &nbsp;
          <p>{comment}</p>
        </div>
      );
    }

  function createPost(){
    return (
      <>
      {displayPost && <div className='main--container-user-post'>
        <div className="post--container">
          <div className="lefthalf--container">
            <div className="image--container">
              <img className="post-image" src={displayPost.post} alt="post" />
            </div>
          </div>

          <div className="righthalf--container">
            <div className="userinfo">
              <div className="tophalf-half">
                <div className="imgandusername">
                  <div className="profilepicture-container">
                    <img
                      className="profilepicture"
                      src={displayPost.profilepicture}
                      alt="profile picture"
                    />
                  </div>
                  <div className="usernameanddomain--container">
                    <h1>{displayPost.username}</h1>
                    <p className="domain--name graytext">@{displayPost.domain}</p>
                  </div>
                </div>
              </div>
              <div className="bottomhalf-half">
                <p className="image--caption">
                  {displayPost.bio}
                </p>
              </div>
            </div>
            <hr />
            <div className="commentsection">
              {commentJsx && commentJsx}
            </div>
            <ul className='ul--heart-comment-share'>
              <i class="fa-regular fa-heart"></i>
              <i class="fa-regular fa-comment"></i>
              <i class="fa-regular fa-share-from-square"></i>
            </ul>
            <strong>20 likes</strong>
            <input
              className="addacomment"
              placeholder="Add a comment..."
            ></input>
          </div>
        </div>
      </div>}
      </>
    );
  }

  return (
    <>
    <Navbar />
    {createPost()}
    </>
  )
}

export default UserPostPage