import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { REGISTER } from 'lib/routes';
import { useState } from 'react';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
    import { auth } from "lib/firebase";

export default function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const logout = async () => {
        await signOut(auth);
      };
    
  return (
    <div>
          <h3> Login </h3>
          <input
              placeholder="Email..."
              onChange={(event) => {
                  setLoginEmail(event.target.value);
              }}/>
            <input
                placeholder="Password..."
                onChange={(event) => {
                    setLoginPassword(event.target.value);   
                }}/>
            <button onClick={login}> Login </button>
            <Link to={REGISTER}>Register</Link>
            <button onClick={logout}> Logout </button>
    </div>
  );
}