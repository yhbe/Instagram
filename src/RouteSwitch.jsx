import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/Main';
import {db, storage} from "./services/firebase"
import {ref, uploadBytes } from "firebase/storage"
import { collection, getDocs } from "firebase/firestore";
import React from 'react';
import {v4} from "uuid"
import Signup from './pages/Signup';


function RouteSwitch() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  let [data, setData] = React.useState([])

  // const imageRef = ref(storage, `${v4()}`)
  // console.log(imageRef)
  
  const usersCollectionRef = collection(db, "posts");

  React.useEffect(() => {
    const getData = async () => {
      const data = await getDocs(usersCollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  console.log(data)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch