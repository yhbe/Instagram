import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";

function login(allUsers, setUser, setLoggedIn, navigate) {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

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
      if (!user) return navigate("../signup");
      let existingUser = allUsers.find((person) => person.email === user.email);
      if (existingUser === undefined || existingUser.length === 0) {
        return navigate("../signup");
      } else {
        setUser(existingUser.domain);
        setLoggedIn(true);
        navigate("../Instagram");
      }
    });
}

export default login;
