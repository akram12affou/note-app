import React, { Fragment, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth' 
import {  signInWithEmailAndPassword,signOut } from 'firebase/auth' 
import { db, auth } from "../firebase";
import {useNavigate} from 'react-router-dom'
function Connexion() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState(true);
  const handleAuth = async (e) => {
    e.preventDefault();
    
    if(signIn){
      try{
        console.log(email)
        await createUserWithEmailAndPassword(auth,email,password);
        setEmail('')
        setPassword('')
        setName('')
      }catch(err){
          console.log(err)
      }
    }else{
      try{
        await signInWithEmailAndPassword(auth,email,password);
        setEmail('')
        setPassword('')
      }catch(err){
          console.log(err.message)
      }
    }

  };
  const handleLogIn = (e) => {
    e.preventDefault();
    setSignIn(!signIn);
  };
  console.log(email,name,password)
  return (
    <form>
      {signIn ? <h1>Register</h1> : <h1>Login</h1>}
      {!signIn && (
        <>
          <label >
            email :
          </label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label >
            password :
          </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </>
      )}
      {signIn && (
        <>
          <label >
            name :
          </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          <label>
            email :
          </label>
          <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label >
            password :
          </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </>
      )}
      <button onClick={handleAuth}>{signIn ? "Sign In" : "Login"}</button>
      <span>
        {" "}
        {signIn ? "Have An Account? " : "No Account? "}
        <span onClick={handleLogIn}>{signIn ? " Login" : " Register"}</span>
      </span>
    </form>
  );
}

export default Connexion;
