import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Button, Toolbar, createTheme, ThemeProvider } from '@mui/material';
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
});

const activeLinkStyle = (isActive) => ({
  fontWeight: isActive ? 'bold' : 'normal',
  textDecoration: isActive ? 'underline' : 'none',
});

export default function Navbar() {
  const { logout, isLoading } = useLogout();
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar sx={{ display: 'grid', justifyContent: 'space-evenly' }}>
          <Toolbar>
            {['/protected/chatroom', '/protected/posts', '/protected/profile'].map((path) => (
              <NavLink
                key={path}
                to={path}
                style={({ isActive }) => ({ textDecoration: 'none', ...activeLinkStyle(isActive) })}
              >
                <Button color="inherit">{path.split('/').pop()}</Button>
              </NavLink>
            ))}
            <Button onClick={logout} color="inherit">
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}
