import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, createTheme, ThemeProvider } from '@mui/material'
import { useLogout } from 'hooks/auth';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F1F1F1',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

export default function Navbar() {
    const {logout, isLoading} = useLogout()
  return (
    <>
    <ThemeProvider theme={theme}>
      <AppBar sx={{display: 'flex', justifyContent: 'space-between' }}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1>HUMBLE</h1>
          </div>
          <div>
          <Button component={Link} to="/protected/chatroom" color="inherit">Chatroom</Button>
          <Button component={Link} to="/protected/posts" color="inherit">Posts</Button>
          <Button component={Link} to="/protected/profile" color="inherit">Profile</Button>
          <Button onClick={logout} color="inherit"> {isLoading ? 'Logging out...' : 'Logout'} </Button>
          </div>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </>
  );
}

