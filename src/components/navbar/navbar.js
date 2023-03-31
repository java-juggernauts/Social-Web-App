import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useLogout } from 'hooks/auth';

export default function Navbar() {
    const {logout, isLoading} = useLogout()
  return (
    <>
      <AppBar sx={{display: 'grid', justifyContent: 'space-evenly'}}>
        <Toolbar>
          <Button component={Link} to="/protected/chatroom" color="inherit">Chatroom</Button>
          <Button component={Link} to="/protected/posts" color="inherit">Posts</Button>
          <Button component={Link} to="/protected/profile" color="inherit">Profile</Button>
          <Button onClick={logout} color="inherit"> {isLoading ? 'Logging out...' : 'Logout'} </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

