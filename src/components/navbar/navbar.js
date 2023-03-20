import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useLogout } from 'hooks/auth';

const navbarStyles = css`
  display: flex;
  justify-content: space-between;
`;

const titleStyles = css`
  flex-grow: 1;
`;

export default function Navbar() {
    const {logout, isLoading} = useLogout()
  return (
    <div css={navbarStyles}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" css={titleStyles}>
        
          </Typography>
          {/* <Button component={Link} to="/" color="inherit">Profile Page</Button> */}
          <Button component={Link} to="/chatroom" color="inherit">Chatroom</Button>
          <Button onClick={logout} isLoading={isLoading}color="inherit">logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

