import "./Navbar.css"
import React from "react";

function Navbar() {
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
        <li><i className="fa-sharp fa-solid fa-house-chimney"></i></li>
        <li> <i className="fa-regular fa-comment"></i></li>
        <li><i className="fa-regular fa-heart"></i></li>
        <li><i className="fa-regular fa-user"></i></li>
      </ul>
    );
  }

  return (
    <>
    <div className="navbar--container">
      <div className="logo-container">
        <div className="logo--group">
          <img className="logo--image" src="./instagramimage.png"></img>
          <h1>Instagram</h1>
        </div>
      </div>
      <div className="searchbox--container">
        <input className="search--input" type="text" placeholder="Search" />
      </div>
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