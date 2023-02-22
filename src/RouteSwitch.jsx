import './App.css'
import Main from './pages/Main';
import {db} from "./services/firebase"
import React from 'react';
import Signup from './pages/Signup';
import UserPage from "./pages/UserPage"
import UserPostPage from "./pages/UserPostPage"
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";



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


  const [eachPostComments, setEachPostComments] = React.useState([])

  React.useEffect(() => {
    posts.forEach((post) => {
      const usersCollectionRef = collection(
        db,
        `users/${post.uniqueid}/usercomments`
      );
      const fetchComments = async () => {
        setEachPostComments([]);
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

  function refreshPage(refreshPosts) {
    const getAllUserLikes = async () => {
      const data = await getDocs(likedPostsCollectionRef);
      setUsersLikedPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllUserLikes();
    
    posts.forEach((post) => {
      const usersCollectionRef = collection(
        db,
        `users/${post.uniqueid}/usercomments`
        );
        const fetchComments = async () => {
        setEachPostComments([]);
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

    if (refreshPosts) {
      const getData = async () => {
        const data = await getDocs(usersCollectionRef);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getData();
    }

    let inputs = document.querySelectorAll(".addacomment-input");
    inputs.forEach((input) => (input.value = ""));
  }

  React.useEffect(() => {
    updateLikedBy()
  }, [usersLikedPosts])

  
  function updateLikedBy(){
    posts.forEach(post => {
      usersLikedPosts.forEach(likedPost => {
        if (likedPost.id === post.uniqueid) {
          if (!likedPost.hearted) {
            if (post.likedby.some(person => person === user)){
              post.likes = post.likes - 1;
              post.likedby.splice(post.likedby.findIndex(person => person === user), 1)
              const removeLikes = async () => {
                const data = await getDocs(usersCollectionRef);
                setDoc(doc(db, `users/${post.uniqueid}`), {
                  ...post,
                });
              };
              removeLikes();
            }
          } else {
            let only1Like = post.likedby.filter((person) => person === user)
            if (only1Like.length === 0){
              post.likes = post.likes + 1;
              post.likedby.push(user)
              const updateLikes = async () => {
                const data = await getDocs(usersCollectionRef);
                  setDoc(doc(db, `users/${post.uniqueid}`,), {
                    ...post,
                  })
              };
              updateLikes();
            }
          }
        }
      })
    })
  }


  function login(allUsers,setUser,setLoggedIn,navigate) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    let foundInDatabase = false;
    let user;
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .then(() => {
        if (!user) return signUp();
        let existingUser = allUsers.find(
          (person) => person.email === user.email
        );
        if (existingUser === undefined || existingUser.length === 0) {
          return signUp();
        } else {
          setUser(existingUser.domain);
          setLoggedIn(true);
          navigate("../Instagram");
        }
      });
  }

  if (posts){
    posts.sort((a,b) =>  {
      if (a.time > b.time){
        return -1
      } else return 1
    })
  }
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Instagram"
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
              updateLikedBy={updateLikedBy}
              allUsers={allUsers}
              setUser={setUser}
              login={login}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup setLoggedIn={setLoggedIn} setUser={setUser} user={user} login={login} allUsers={allUsers}/>
          }
        />
        <Route
          path="/user/:userId"
          element={<UserPage allUsers={allUsers} posts={posts} user={user} />}
        />
        <Route
          path="/user/:userId/:postid"
          element={
            <UserPostPage
              allUsers={allUsers}
              posts={posts}
              user={user}
              usersLikedPosts={usersLikedPosts}
              refreshPage={refreshPage}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}  

export default RouteSwitch



