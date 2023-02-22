import "./Navbar.css"
import React from "react";
import { useNavigate } from 'react-router-dom';
import instagramimage from "/instagramimage.png"

function Navbar(props) {
  const [showButtons,setShowButtons] = React.useState(false)

  
  
  const removeButtons = () => {
    if (window.innerWidth <= 960){
      setShowButtons(false)
    } else {
      setShowButtons(true)
    }
  }
  
  window.addEventListener("resize", () => removeButtons())
  
  React.useEffect(() => {
    removeButtons()
  }, [])
  
  function createButtons(){
    return (
      <ul className="buttons-ul">
        <li onClick={() => homePage()}>
          <i className="fa-sharp fa-solid fa-house-chimney"></i>
        </li>
        <li>
          <i className="fa-regular fa-comment unclickable"></i>
        </li>
        <li>
          <i className="fa-regular fa-heart unclickable"></i>
        </li>
        <li onClick={() => goToUserPage()}>
          <i className="fa-regular fa-user"></i>
        </li>
      </ul>
    );
  }
  
  let navigate = useNavigate();
  function homePage(){
    navigate("../Instagram");
  }
  

  function goToUserPage(){
    if (props.user){
      navigate("../Instagram");
      setTimeout(() => {
        navigate(`../user/${props.user}`);
      }, "1 second");
    } else {
      navigate(`../signup`);
    }
  }

  return (
    <>
      <div className="navbar--container">
        {showButtons && (
          <>
            <div className="logo-container">
              <div onClick={() => homePage()} className="logo--group">
                <img className="logo--image" src={instagramimage}></img>
                <h1>Instagram</h1>
              </div>
            </div>
            <div className="searchbox--container">
              <input
                className="search--input"
                type="text"
                placeholder="Search"
              />
            </div>
          </>
        )}
        {showButtons ? (
          <div className="buttons-container">
            {showButtons && createButtons()}
          </div>
        ) : (
          <div className="mobile--container">{createButtons()}</div>
        )}
      </div>
    </>
  );
}

export default Navbar