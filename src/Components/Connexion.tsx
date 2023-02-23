import React, { Fragment, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
function Connexion({ user, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (signIn) {
      try {
        console.log(email);
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        setName("");
        navigate("Note-App");
        
        await updateProfile(user).catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        await updateProfile(user, { displayName: "name" }).catch((err) =>
          console.log(err)
        );
      } catch (err) {
        console.log(err.message);
      }
    }
    setUser(email)
  };
  const handleLogIn = (e) => {
    e.preventDefault();
    setSignIn(!signIn);
  };
  console.log(email, name, password);
  return (
    <form>
      {signIn ? <h1>Register</h1> : <h1>Login</h1>}
      {!signIn && (
        <>
          email :
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          password :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      {signIn && (
        <>
          name :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          email :
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          password :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      <button onClick={handleAuth}>{signIn ? "Sign In" : "Login"}</button>
      <span>
        {" "}
        {signIn ? "Have An Account? " : "No Account? "}
        <span class='link' onClick={handleLogIn}>{signIn ? " Login" : " Register"}</span>
      </span>
    </form>
  );
}

export default Connexion;
