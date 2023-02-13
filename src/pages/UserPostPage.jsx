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

    const usersCollectionRef = collection(db, "users/1/usercomments");

    const [comments, setComments] = React.useState([])

    React.useEffect(() => {
      const getData = async () => {
        const data = await getDocs(usersCollectionRef);
        setComments(data.docs.map((doc) => ({ ...doc.data()})));
      };
      getData();
    }, []);
    
    let sortUserComments;
    let commentJsx;

    if (comments.length > 0){
      console.log(comments)
      sortUserComments = comments.map(comment => {
        let arr = []
        let user
        for (let key in comment){
          user = props.allUsers.find(user => {
            if (user.domain === key){
              user.comment = comment[`${user.domain}`]
              arr.push(user)
            }
          })
        }
        return arr
      })

      commentJsx = sortUserComments[0].map(comment => {
        console.log(comment.domain, "comment")
        return createCommentJsx(comment)
      })
    }
    
    
    function createCommentJsx(user){
      return (
        <>
        <h1>{user.domain}</h1>
        <p>{user.comment}</p>
        </>
      )
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quis, quae assumenda vitae expedita quas voluptates nesciunt, sapiente minima animi placeat autem cumque possimus. Veniam repellat tempore fugit dignissimos tempora.
                </p>
              </div>
            </div>
            <hr />
            <div className="commentsection">
              {commentJsx && commentJsx}
            </div>
            <ul>
              <i class="fa-regular fa-heart"></i>
              <i class="fa-regular fa-comment"></i>
              <i class="fa-regular fa-share-from-square"></i>
            </ul>
            <p>20 likes</p>
            <hr />
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