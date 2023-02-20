import React from 'react'
import Navbar from '../components/Navbar'
import style from "./UserPostPage.css"
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { db} from "../services/firebase";
import { useNavigate } from "react-router-dom";


function UserPostPage(props) {
  let path = window.location.pathname;
  path = path.split("/")
  let postId = path[3]

  //i page makes a database call to get info instead of relying on passed props incase of refresh
  const usersPostCollectionRef = collection(db, "users");
  const [downloadPost, setDownloadPost] = React.useState([])

  const resetData = async () => {
    const data = await getDocs(usersPostCollectionRef);
    setDownloadPost(data.docs.map((doc) => ({ ...doc.data() })));
  }

  React.useEffect(() => {resetData()}, []);
  

  let displayPost = downloadPost.find(post => post.uniqueid === postId)

    const usersCollectionRef = collection(db, `users/${postId}/usercomments`);

    const [comments, setComments] = React.useState([])


    const fetchComments = async () => {
      const data = await getDocs(usersCollectionRef);
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    React.useEffect(() => {
      fetchComments()
    }, []);

    
    let sortUserComments;
    
    let commentJsx = []

    if (comments.length > 0){
      comments.sort((a, b) => {
        if (a.time > b.time) {
          return 1;
        } else return -1;
      });
      comments.map(comment => {
        props.allUsers.find((user) => {
          if (user.domain === comment.domain) {
            comment.name = user.name
            comment.profilepicture = user.profilepicture
            return commentJsx.push(createCommentJsx(comment));
          }
        });
      })
    }

    function createCommentJsx(user){
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
            <strong>{user.domain}</strong>
          </p>
          &nbsp;
          <p className='user-comment'>{user.comment}</p>
        </div>
      );
    }

    const [userComment, setUserComment] = React.useState([])

    let navigate = useNavigate()
    const postComment = async () => {
      if (!props.user) return navigate("../signup")
      const usersCommentsCollectionRef = collection(
        db,
        `users/${postId}/usercomments/`
      );
      await addDoc(usersCommentsCollectionRef, {
        time: Date.now(),
        comment: `${userComment}`,
        domain: `${props.user}`
      });
      document.querySelector(".addacomment").value = "";
      fetchComments()
    }



    let inputAComment = document.querySelector(".addacomment");
    if (inputAComment){
      inputAComment.addEventListener("keydown", submitInputComment)
    }

    function submitInputComment(event) {
      if (event.key === "Enter" && userComment.length > 0) {
        postComment()
      } else {
        inputAComment.removeEventListener("keydown", submitInputComment);
      }
    }

    let hearted = false
    let interactedUserPost;

    if (displayPost){
      if (props.usersLikedPosts) {
        interactedUserPost = props.usersLikedPosts.filter(
          (userlikedpost) => userlikedpost.id === displayPost.id
        );

        if (interactedUserPost.length === 0) {
          hearted = false;
        } else hearted = interactedUserPost[0].hearted;
      }

      let likes = props.posts.find(post => post.id === displayPost.id)
      displayPost.likes = likes.likes
    }
    
    const [locked, setLocked] = React.useState(false);

    function updatePostHeartDatabase() {

      if (!locked) {
        const updatePostHeart = async () => {
          if (!props.user) return navigate("../signup");
          await setDoc(
            doc(db, `usercollection/${props.user}/likes`, `${displayPost.id}`),
            {
              hearted: !hearted,
            }
          );
          props.refreshPage();
        };
        updatePostHeart();
        setLocked(true);
        setTimeout(unlock, 500);
      }
    }
  
    function unlock() {
      setLocked(false);
    }

  function createPost(){
    return (
      <>
        {displayPost && (
          <div className="main--container-user-post">
            <div className="post--container">
              <div className="lefthalf--container">
                <div className="image--container">
                  <img
                    className="post-image"
                    src={displayPost.post}
                    alt="post"
                  />
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
                        <p className="domain--name graytext">
                          @{displayPost.domain}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bottomhalf-half">
                    <p className="image--caption">{displayPost.bio}</p>
                  </div>
                </div>
                <hr />
                <div className="commentsection">{commentJsx && commentJsx}</div>
                <ul className="ul--heart-comment-share">
                  {hearted ? (
                    <i
                      onClick={() => updatePostHeartDatabase()}
                      class="fa-solid fa-heart"
                    ></i>
                  ) : (
                    <i
                      onClick={() => updatePostHeartDatabase()}
                      class="fa-regular fa-heart"
                    ></i>
                  )}
                  <i class="fa-regular fa-comment"></i>
                  <i class="fa-regular fa-share-from-square"></i>
                </ul>
                <strong>{displayPost.likes} likes</strong>
                <div className="input--div">
                  <input
                    className="addacomment"
                    placeholder="Add a comment..."
                    onChange={(event) => setUserComment(event.target.value)}
                  ></input>
                  <i
                    onClick={() => postComment()}
                    class="fa-solid fa-paper-plane"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
    <Navbar user={props.user} />
    {createPost()}
    </>
  )
}

export default UserPostPage