import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/Main';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch
