import React, { useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { CardActionArea } from '@mui/material';

// custom imports
import theme from '../../assets/theme';
import { generateUniqueKey } from '../utilities/RandomKeyGen';
import LoadingSpinner from '../utilities/LoadingSpinner';
import BibModal from './bibrecord/BibModal';
import ApiFunc from '../utilities/apiFunc';

const HomePageResultBox = (props) => {

  const url = props.url;
  const { data, error, loading } = ApiFunc(url);
  console.log('HomePageResultBox data:',data);

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
        {open && ( <BibModal open={open} item={item} onClose={handleClose} /> )}

        <ListItem sx={{
            marginBottom: '2rem',
            marginX: 0,
            marginTop: 0,
            backgroundColor: theme.palette.primary.main
          }}> 

          <ListItemText disableTypography
          primary={<Typography variant="h6" sx={{
            color: theme.palette.secondary.main,
            marginLeft: 0,
            marginRight: 0,
          }}>{props.title}
          </Typography>} />
        </ListItem>

        {/* record list map */}
        {!loading && <LoadingSpinner />}
        {error && <p>Errore: {error}</p>}
        {
        data?.hits.map(
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
                {/* {item.fields.tag100.replace(/,\s*$/, "").replace(/\.$/, "")} */}
                {item.fields.tag100}
                </Typography>

                <Typography 
                key={generateUniqueKey()} 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                >
                {/* {item.fields.tag110.replace(/,\s*$/, "").replace(/\.$/, "")} */}
                {item.fields.tag110}
                </Typography>

                <Typography key={generateUniqueKey()} 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                >
                {/* {item.fields.tag111.replace(/,\s*$/, "").replace(/\.$/, "")} */}
                {item.fields.tag111}
                </Typography>

                <Typography 
                key={generateUniqueKey()} 
                gutterBottom 
                variant="subtitle1"                 
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'medium'
                }}>
                {/* {item.fields.tag245.replace(/\.$/, "")} */}
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
                
                {/* <Typography 
                key={generateUniqueKey()} 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                >
                {item.fields.tag008date}
                </Typography> */}

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


  
export default HomePageResultBox;