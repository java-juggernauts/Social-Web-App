import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Login() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       <TextField color="secondary" focused 
          helperText="Enter your UserName"
          id="standard-username-input"
          label="UserName"
          type="username"

          variant="standard"
        />
    <TextField color="secondary" focused
          helperText="Enter your Password"
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
    </Box>
  );
}