import * as React from 'react';
import { Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

// custom import
import { API_URL } from '../utilities/apiUrl';
import theme from '../../assets/theme';
import { generateUniqueKey } from '../utilities/RandomKeyGen';
import LoadingSpinner from '../utilities/LoadingSpinner';
import ApiFunc from '../utilities/apiFunc';
import CustomizedSwitches from './filters/IosSwitch';

const Facetsidebar = (props) => {

  // console.log('Facetsidebar Query:',props.query);  
  // console.log('Facetsidebar BoxType:',props.boxtype);
  // console.log('Facetsidebar Filter:',props.filter);
  // console.log('Facetsidebar online:',props.online);

  // LINK IN PRODUZIONE
  // https://stackoverflow.com/questions/69955965/proxying-api-requests-in-production-for-react-express-app
  const url = `${API_URL}/apifacets?online=${props.online}&filter=${props.filter}&query=${props.query}`
  
  // console.log(url);
  const { data, error, loading } = ApiFunc(url);
  // console.log(data);

  return (
        <React.Fragment>
        
        {!loading && <LoadingSpinner />}
        {error && <p>Errore: {error}</p>}
        {data?.facets && data.facets.length > 0 &&
        // {/* colonna sx marc21 facets */}
        <Grid item xs={12} lg={6}>
        <Typography variant="h6" color='primary'
        sx={{
          marginBottom: '1rem'
        }}
        >Per tipo di campo</Typography>
        <Box 
        sx={{
            backgroundColor: 'transparent',
        }}
        >
      
      {data?.facets.map( 
        item => <Accordion key={generateUniqueKey()} defaultExpanded={false}>
        <AccordionSummary
          key={generateUniqueKey()}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography 
          variant='h6'
          sx={{
            color: theme.palette.primary.main
          }}
          key={generateUniqueKey()}
          >{item.fam_name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List>
        {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {item['0'] && <ListItem disablePadding>
              <ListItemText primary={item['0']} 
              sx={{
                color: theme.palette.primary.main
              }}
               />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['1'] && <ListItem disablePadding>
              <ListItemText primary={item['1']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['2'] && <ListItem disablePadding>
              <ListItemText primary={item['2']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['3'] && <ListItem disablePadding>
              <ListItemText primary={item['3']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['4'] && <ListItem disablePadding>
              <ListItemText primary={item['4']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['5'] && <ListItem disablePadding>
              <ListItemText primary={item['5']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['6'] && <ListItem disablePadding>
              <ListItemText primary={item['6']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['7'] && <ListItem disablePadding>
              <ListItemText primary={item['7']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['8'] && <ListItem disablePadding>
              <ListItemText primary={item['8']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['9'] && <ListItem disablePadding>
              <ListItemText primary={item['9']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['10'] && <ListItem disablePadding>
              <ListItemText primary={item['10']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['11'] && <ListItem disablePadding>
              <ListItemText primary={item['11']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['12'] && <ListItem disablePadding>
              <ListItemText primary={item['12']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['13'] && <ListItem disablePadding>
              <ListItemText primary={item['13']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['14'] && <ListItem disablePadding>
              <ListItemText primary={item['14']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['15'] && <ListItem disablePadding>
              <ListItemText primary={item['15']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['16'] && <ListItem disablePadding>
              <ListItemText primary={item['16']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['17'] && <ListItem disablePadding>
              <ListItemText primary={item['17']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          {item['18'] && <ListItem disablePadding>
              <ListItemText primary={item['18']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['19'] && <ListItem disablePadding>
              <ListItemText primary={item['19']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['20'] && <ListItem disablePadding>
              <ListItemText primary={item['20']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['21'] && <ListItem disablePadding>
            <ListItemButton>
            
              <ListItemText primary={item['21']}
              sx={{
                color: theme.palette.primary.main
              }}
               />
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>}

          {item['22'] && <ListItem disablePadding>
            <ListItemButton>
            
              <ListItemText primary={item['22']}
              sx={{
                color: theme.palette.primary.main
              }}
               />
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>}


          {item['23'] && <ListItem disablePadding>
              <ListItemText primary={item['23']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['24'] && <ListItem disablePadding>
              <ListItemText primary={item['24']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['25'] && <ListItem disablePadding>
              <ListItemText primary={item['25']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}

          {item['26'] && <ListItem disablePadding>
              <ListItemText primary={item['26']} 
              sx={{
                color: theme.palette.primary.main
              }}
              />
              <CustomizedSwitches label="" />
          </ListItem>}


          

          
        
        </List>
        </AccordionDetails>
      </Accordion>
      )
      }
      
    </Box></Grid>}
    </React.Fragment>
  );
};

export default Facetsidebar;