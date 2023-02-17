import image from "/more-hori.svg";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";


export default function createPosts(post, goToProfile, postArr, navigate, setCommentsToPost, commentsToPost, user, refreshPage, usersLikedPosts) {
  let newestPost = false;
  let secondNewestPost = false;
  let interactedUserPost 

  if (postArr) {
    postArr = postArr.sort((a, b) => {
      if (a.time > b.time) {
        return -1;
      } else return 1
    });
    newestPost = postArr.at(1); 
    secondNewestPost = postArr.at(0);
  }

  let hearted
  if (usersLikedPosts){
    interactedUserPost = usersLikedPosts.filter(userlikedpost => userlikedpost.id === post.id)
  }

  function postComment(){
    let commentToPost = commentsToPost.filter(
      (comment) => comment.id === post.id
    );
    if (!commentToPost[0]) return
    let uploadComment = commentToPost[0].comment;
    const postCommentToDataBase = async () => {
      if (!user) return navigate("../signup");
      const usersCommentsCollectionRef = collection(
        db,
        `users/${post.id}/usercomments/`
      );
      await addDoc(usersCommentsCollectionRef, {
        time: Date.now(),
        comment: `${uploadComment}`,
        domain: `${user}`,
      });
      refreshPage();
    };
    postCommentToDataBase()
  }



  let inputs = document.querySelectorAll(".addacomment-input");

  if (inputs) {
    inputs.forEach((input) =>
      input.addEventListener("keydown", submitInputComment)
    );
  }

  function submitInputComment(event) {
    if (event.key === "Enter") {
      setCommentsToPost([])
      postComment();
    } else {
      inputs.forEach((input) =>
        input.removeEventListener("keydown", submitInputComment)
      );
    }
  }

  function updatePostHeartDatabase(){
    if (interactedUserPost.length === 0){
      hearted = false
    } else hearted = interactedUserPost[0].hearted;

    const updatePostHeart = async () => {
      if (!user) return navigate("../signup");
      await setDoc(doc(db, `usercollection/${user}/likes`, `${post.id}`), {
        hearted: !hearted,
      });
    };
    updatePostHeart();
    refreshPage();
  }

  if (interactedUserPost.length === 0) {
    hearted = false;
  } else hearted = interactedUserPost[0].hearted;


  return (
    <div id={post.domain} className="instagram--post">
      <div className="instagram--post-header">
        <div className="header-left">
          <img
            className="post--profile-picture"
            src={post.profilepicture}
          ></img>
          <div
            onClick={(event) => goToProfile(event)}
            className="header-left-text"
          >
            <p>{post.username}</p>
            <p className="user-domain">@{post.domain}</p>
          </div>
        </div>
        <img src={image}></img>
      </div>
      <div className="instagram--post-image">
        <img
          onClick={() => navigate(`./user/${post.domain}/${post.uniqueid}`)}
          className="image"
          src={post.post}
        ></img>
      </div>
      <div className="instagram--post-footer">
        <div className="interact-row">
          <div className="heart-comment-share">
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
          </div>
          <i class="fa-solid fa-link"></i>
        </div>
        <p className="likes">54 Likes</p>
        <div className="comments--row">
          <p className="view-all-comments">View All Comments</p>
          <div className="twoComments">
            {postArr && (
              <>
                {newestPost && (
                  <p
                    className="post"
                    onClick={() =>
                      navigate(`../user/${secondNewestPost.domain}`)
                    }
                  >
                    <strong>{newestPost.domain}</strong> {newestPost.comment}
                  </p>
                )}
                {secondNewestPost && (
                  <p
                    className="post"
                    onClick={() =>
                      navigate(`../user/${secondNewestPost.domain}`)
                    }
                  >
                    <strong>{secondNewestPost.domain}</strong>{" "}
                    {secondNewestPost.comment}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="addacomment-input-div">
            <input
              className="addacomment-input"
              type="text"
              placeholder="Add a comment..."
              onChange={(event) =>
                setCommentsToPost((prevState) => {
                  let a = prevState.filter((state) => state.id !== post.id);
                  return [
                    ...a,
                    { comment: event.target.value, id: post.uniqueid },
                  ];
                })
              }
            />
            <i
              onClick={() => postComment()}
              class="fa-solid fa-paper-plane"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
