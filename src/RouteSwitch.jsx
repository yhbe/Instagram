import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/Main';
import {db, storage} from "./services/firebase"
import {ref, uploadBytes } from "firebase/storage"
import { collection, getDocs } from "firebase/firestore";
import React from 'react';
import {v4} from "uuid"
import Signup from './pages/Signup';
import UserPage from "./pages/UserPage"


function RouteSwitch() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [posts, setPosts] = React.useState([])
  const [allUsers,setAllUsers] = React.useState([])
  const [user,setUser] = React.useState(null)

  console.log(allUsers, "users")
  // console.log(posts)
  // console.log(loggedIn,user)
  
  const allUsersCollectionRef = collection(db, "usercollection")
  const usersCollectionRef = collection(db, "users");

  React.useEffect(() => {
    const getAllUsers = async () => {
      const data = await getDocs(allUsersCollectionRef);
      setAllUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getData = async () => {
      const data = await getDocs(usersCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAllUsers();
    getData();
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Main loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} posts={posts}/>}
        />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setUser={setUser}/>} />
        <Route path="/user/:userId" element={<UserPage allUsers={allUsers} posts={posts}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch
