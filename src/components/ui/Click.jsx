import React from 'react';
import { Button } from "@mui/material";


const Bottone = () => {
    return(
        <Button variant="contained" sx={{color: 'secondary.main', 
        backgroundColor: 'primary.main',
        '&:hover': {
            backgroundColor: 'secondary.main',
            color: 'primary.main'
          }}} >Contained</Button>);
}

export default Bottone;