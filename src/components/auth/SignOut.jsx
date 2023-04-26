import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';


const SignOut = ({ setAuthenticated, handleSignOut }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
        handleSignOut();
        navigate('/');
      };
  
    return (
      <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'none', lg: 'flex' } }}>
        <Tooltip title="Logout">
        <IconButton onClick={handleLogout} sx={{ p: 0 }}>
            <LogoutIcon fontSize="large" color='primary'/>
          </IconButton>
        </Tooltip>
      </Box>
    );
  };
  
  export default SignOut;