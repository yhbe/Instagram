import "./Navbar.css"

function Navbar() {
  return (
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
      <div className="buttons-container">
        <i class="fa-sharp fa-solid fa-house-chimney"></i>
        <i class="fa-regular fa-comment"></i>
        <i class="fa-regular fa-heart"></i>
        <i class="fa-regular fa-user"></i>
      </div>
    </div>
  );
}

export default Navbar