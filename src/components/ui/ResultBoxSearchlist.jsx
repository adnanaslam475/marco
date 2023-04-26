import React, { useState } from 'react';
import { ListItem, ListItemText, Divider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Box, Zoom, Modal, Card, CardContent, CardActionArea, Button, Link } from '@mui/material';

// custom import
import theme from '../../assets/theme';
import { generateUniqueKey } from '../utilities/RandomKeyGen';
import LoadingSpinner from '../utilities/LoadingSpinner';
import ApiFunc from '../utilities/apiFunc';
import DataPagination from './DataPagination';
import BibModal from './bibrecord/BibModal';

const ResultBoxSearchList = (props) => {



  const [open, setOpen] = useState(null);
  const [item, setItem] = useState(null);
  const handleOpen = (item) => {
    setOpen(true);
    setItem(item);
  }
  const handleClose = () => {
    setOpen(null);
    setItem(null);
  }
  
  return (
      <React.Fragment>

{open && (
        <BibModal open={open} item={item} onClose={handleClose} />
      )}


        <ListItem id={props.hashid} sx={{
            marginBottom: '2rem',
            marginLeft: '1rem',
            marginTop: '1rem'
          }}> 

          <ListItemText disableTypography
          primary={<Typography variant="h6" sx={{
            color: theme.palette.primary.main,
            marginLeft: 0,
            marginRight: 0,
          }}>
          <p sx={{ marginBottom: '4rem' }}>{props.boxtype} ({props.risultati})</p>
          </Typography>} 
          />
        </ListItem>
        <Divider sx={{
            width: '100%',
            marginY: '3rem'
          }} />



        {/* qui la lista dei 10 record preview */}

        {
        props.data_array.map(
          item => <ListItem sx={{
            width:1,
            marginLeft: 0,
            marginRight: 0,
          }}
          key={generateUniqueKey()}> 
            <Card 
            key={generateUniqueKey()} 
            elevation={0} 
            sx={{
              width: 1, marginRight: 0, marginLeft:0
              }}
              
              >

                <CardActionArea 
                key={generateUniqueKey()}
                onClick={() => handleOpen(item)}
                >

                <CardContent key={generateUniqueKey()}>
                
                {/* <Typography 
                key={generateUniqueKey()} 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                >
                {item.id}
                </Typography> */}

                

                <Typography 
                key={generateUniqueKey()} 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                >
                {item.fields.tag100}
                </Typography>

                <Typography 
                key={generateUniqueKey()} 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                >
                {item.fields.tag110}
                </Typography>

                <Typography key={generateUniqueKey()} 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                >
                {item.fields.tag111}
                </Typography>

                <Typography 
                key={generateUniqueKey()} 
                gutterBottom 
                variant="h6"                 
                sx={{
                  color: theme.palette.primary.main,
                }}>
                {item.fields.tag245}
                </Typography>

                <Typography 
                key={generateUniqueKey()} 
                sx={{
                  color: theme.palette.primary.main,
                }}
                variant="body2">
                {item.fields.tag260}
                </Typography>
                
                </CardContent>
                </CardActionArea>
                <Divider key={generateUniqueKey()}
                
                 />
                </Card>
                
                </ListItem>

        )
        }

      </React.Fragment>
      );
}


  
export default ResultBoxSearchList;