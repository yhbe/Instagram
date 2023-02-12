import image from "/more-hori.svg";
import { useNavigate } from "react-router-dom";


export default function createPosts(post,goToProfile) {
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
