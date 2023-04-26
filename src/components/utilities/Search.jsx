import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Slide, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


// custom imports
import theme from '../../assets/theme';




const SearchBar = (props) => {

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  console.log('[Search.js params.get("q")]: ',params.get('q'));

  const paramsearchbarcheck = params.get('q');
  // q = ev.target.value.split(/[, ]+/)
  // fq = props.filter

  let navigate = useNavigate();
  const [message, setMessage] = useState('');

  const GoTosearch = (q,fq,filter,fields,start,sort,ord) =>  {
    if (paramsearchbarcheck) {
      navigate(`/search?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`, {
        state: {
          pathname: "/search",
          search: `?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`,
          hash: "",
          key: "search-result-page",
    }
  }
);
    // window.location.reload();
    } else {
      // i parametri sono: 
      // - query (q), 
      // - online (fq)
      // - filter [1,2,3,4,5]
      // - fields []
      // - start [0,1,2,3,...]
      // - sort [_score, tag008date, ...]
      // - ord [desc, asc]
      navigate(`/search?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`, {
        state: {
          pathname: "/search",
          search: `?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`,
          hash: "",
          key: "search-result-page",
      }
    }
    );
    }
    } 


 	return (
    <Slide direction='left' in={true} timeout={{ appear: 500, enter: 500, exit: 500 }} >
      <Box 
      sx={{ 
        '& > :not(style)': { 
          m: 1, 
          backgroundColor: theme.palette.secondary.main, 
          borderRadius: 2, } }}
      >

		  <TextField
      // label="cerca"
    //   helperText={
    //     <Typography 
    //     component="span"
    //       variant="caption" 
    //       display="block"
    //       sx={{
    //         textAlign: 'center',
    //         color: theme.palette.secondary.main,
    //         marginY: 0

    //       }}
    //     >
    //         premi invio per avviare la ricerca
    //     </Typography>
    //  }
      color="secondary" 
      focused
      // margin='dense'
      sx = {{
          // width: "80%", 
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: 0,
          // marginTop: 0,
          // marginBottom: 0,
          fontWeight: 500,
          input: {
            borderRadius: 1,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main,
            // textAlign: 'center',
            height: '1rem',
            marginY: '0.5rem',
            
            // backgroundColor: "white"
          },
          inputLabel: {
            color: theme.palette.common.white,
            borderRadius: 1,
            marginY: 0
          },
            
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment 
            position="start"
            sx={{
              marginY: 0
            }}
            >
              <IconButton 
              aria-label="search"
              sx={{
                marginY: 0
              }}
              >
              <SearchIcon
              sx={{
                marginY: 0
              }}
               />
               </IconButton>
            </InputAdornment>
          ),
        }}
        id="input-with-icon-textfield"
        placeholder="es.: storia di Milano"
        fullWidth
        variant="outlined"
        onChange={event => setMessage(event.target.value)}
        onKeyPress = {
          ((ev) => {
            if (ev.key === "Enter") {
              // GoTosearch(ev.target.value.split(/[, ]+/), props.filter);
              // remove punctuation ev.target.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").
              
              // i parametri sono: 
                // - query (q), 
                // - online (fq)
                // - filter [1,2,3,4,5]
                // - fields []
                // - start [0,1,2,3,...]
                // - sort [_score, tag008date, ...]
                // - ord [desc, asc]

                // q,fq,filter,fields,start,sort,ord

              GoTosearch(
                ev.target.value.replace(/\s/g, '+'), 
                props.fq,
                props.filter,
                props.fields,
                props.start,
                props.sort,
                props.ord
                );
            }
          })
        }
      value={message}
      /> 
      {/* chiude TextField */}

      </Box>
       </Slide>
       
		
    );
 }


 export default SearchBar;