import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SignOut from '../../auth/SignOut';
import LoginIcon from '@mui/icons-material/Login';

// custom imports
import theme from '../../../assets/theme';
import logo from '../../../assets/logo.svg';


const Header = ({ isAuthenticated, handleSignOut }) => {

  const pages = [
    {name: "Home", link: "/", activeIndex: 0},
    {name: "Servizi", link: "/servizi", activeIndex: 1},
    {name: "Altri strumenti di ricerca", link: "/altri-strumenti-di-ricerca", activeIndex: 2},
    {name: "Informazioni", link: "/informazioni", activeIndex: 3},
    {name: "Aiuto", link: "/aiuto", activeIndex: 4}
    ]

  return (
    <AppBar position="static" >
      <Container 
      maxWidth="false"
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
      }}>
        <Toolbar disableGutters >
          <Button 

          component={Link} 
          to="/"
          sx={{
            '&:hover': {
              backgroundColor: "transparent"
            },
            [theme.breakpoints.down("md")]: {
              margin: "auto",
              
                   
            },
            [theme.breakpoints.down("xs")]: {
              margin: "auto",
            }
            
          }}>
          <Box
            component="img"
            sx={{
              height: "8em",
              margin: "0.5em",
            [theme.breakpoints.down("md")]: {
              height: "6em",  
                   
            },
            [theme.breakpoints.down("xs")]: {
              height: "5em",
              
            }
            }}
            alt="Logo"
            src={logo} >  
          </Box>
          </Button>

          
         

          <Box 
          sx={{ 
            flexGrow: 1,
             display: { xs: 'none', md: 'flex' },
             marginLeft: "3rem"
              }}>
            {pages.map((page, index) => (
              <Button
              key={`${page}${index}`}
              component={Link} 
              to={page.link}
              // href={page.link}
              sx={{ my: 2, color: theme.palette.primary.main, display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
      
      {/* utente autenticato login/logout button sull'header per ora */}
      {isAuthenticated && (
        <>
        <SignOut setAuthenticated={isAuthenticated} handleSignOut={handleSignOut} />
        </>
        )}

        {!isAuthenticated && (
        <>
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'none', lg: 'flex' } }}>
        <Tooltip title="Login">
        <IconButton sx={{ p: 0 }}>
          <Link to="/signin">
          <LoginIcon fontSize="large" color='primary'
          />
          </Link>
        </IconButton>
        </Tooltip>
        </Box>              
        </>
      )}

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
