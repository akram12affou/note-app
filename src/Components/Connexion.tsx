import React, { Fragment, useEffect, useState,FC } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from "reactstrap";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
type Props = {
  setUser?: React.Dispatch<React.SetStateAction<any>>;
};
function Connexion({ setUser }: Props):FC {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signIn, setSignIn] = useState<boolean>(true);
  const handleAuth = async (e) => {
    e.preventDefault();
    if (signIn) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        navigate("Note-App");
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("")
      } catch (err) {
        alert(err.message);
      }
    }
    setUser(email);
  };
  const handleLogIn = (e) => {
    e.preventDefault();
    setSignIn(!signIn);
  };
  return (
    <form>
      {signIn ? <h1>Register</h1> : <h1>Login</h1>}
      {!signIn && (
        <>
          <div>
            email :
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            password :
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </>
      )}
      {signIn && (
        <>
          <div>
            email :
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            password :
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </>
      )}
      <button onClick={handleAuth}>{signIn ? "Sign In" : "Login"}</button>
      <span>
        {" "}
        {signIn ? "Have An Account? " : "No Account? "}
        <span class="link" onClick={handleLogIn}>
          {signIn ? " Login" : " Register"}
        </span>
      </span>
    </form>
  );
}

export default Connexion;
