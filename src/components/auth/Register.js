import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from 'lib/firebase';
import { Link } from 'react-router-dom';
import { LOGIN } from 'lib/routes';
// import { TextField } from '@mui/material';
// import { Box } from '@mui/system';
// import { Button } from '@mui/material';

export default function Register() {
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };
    return (
    <div className="Register">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create Account </button>
        <Link to={LOGIN}>Login</Link>
        </div>
    </div>
    );
    }