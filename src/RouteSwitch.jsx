import './App.css'
import Main from './pages/Main';
import {db} from "./services/firebase"
import React from 'react';
import Signup from './pages/Signup';
import UserPage from "./pages/UserPage"
import UserPostPage from "./pages/UserPostPage"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";


function RouteSwitch() {
  const [user,setUser] = React.useState(null)
  const [posts, setPosts] = React.useState([])
  const [allUsers,setAllUsers] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [usersLikedPosts, setUsersLikedPosts] = React.useState([])
  

  const allUsersCollectionRef = collection(db, "usercollection")
  const usersCollectionRef = collection(db, "users");
  const likedPostsCollectionRef = collection(db, `usercollection/${user}/likes`)

  React.useEffect(() => {
    const getAllUsers = async () => {
      const data = await getDocs(allUsersCollectionRef);
      setAllUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getData = async () => {
      const data = await getDocs(usersCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getAllUserLikes = async() => {
      const data = await getDocs(likedPostsCollectionRef);
      setUsersLikedPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getAllUsers();
    getData();
    getAllUserLikes()
  }, [user]);

  console.log(usersLikedPosts)

  const [eachPostComments, setEachPostComments] = React.useState([])

  React.useEffect(() => {
    posts.forEach((post) => {
      const usersCollectionRef = collection(
        db,
        `users/${post.uniqueid}/usercomments`
      );
      const fetchComments = async () => {
        const data = await getDocs(usersCollectionRef);
        setEachPostComments((prevState) => {
          return [
            ...prevState,
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          ];
        });
      };
      fetchComments();
    });
  }, [posts])
  
  function refreshPage() {
    const getAllUserLikes = async () => {
      const data = await getDocs(likedPostsCollectionRef);
      setUsersLikedPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllUserLikes();

    setEachPostComments([]);
    posts.forEach((post) => {
      const usersCollectionRef = collection(
        db,
        `users/${post.uniqueid}/usercomments`
      );
      const fetchComments = async () => {
        const data = await getDocs(usersCollectionRef);
        setEachPostComments((prevState) => {
          return [
            ...prevState,
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          ];
        });
      };
      fetchComments();
    });
    let inputs = document.querySelectorAll(".addacomment-input");
    inputs.forEach((input) => (input.value = ""));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              posts={posts}
              eachPostComments={eachPostComments}
              setEachPostComments={setEachPostComments}
              refreshPage={refreshPage}
              usersLikedPosts={usersLikedPosts}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup setLoggedIn={setLoggedIn} setUser={setUser} user={user} />
          }
        />
        <Route
          path="/user/:userId"
          element={<UserPage allUsers={allUsers} posts={posts} user={user} />}
        />
        <Route
          path="/user/:userId/:postid"
          element={
            <UserPostPage allUsers={allUsers} posts={posts} user={user} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}  

export default RouteSwitch



