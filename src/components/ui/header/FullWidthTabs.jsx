import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {Container, Tabs, Tab, Typography, Box, AppBar, Paper, Slide} from '@mui/material';


// custom imports
// import theme from '../../assets/theme';
import SearchBar from '../../utilities/Search';

function TabPanel(props) {
  
  
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment>
          <Container 
          maxWidth='lg'
          >
        <Box 
        sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
        </Container>
        </React.Fragment>
        
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {

  const { online, searchquery } = useParams();

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (props.tabfocus === 'online') {
  return (
    <Paper elevation={4}
    // maxwidth='xl'
    square={true}
    sx={{ width: '100%', backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }}
    >
      <AppBar position="static" elevation={0} >
      <Tabs
          
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="full width tabs example"
          centered
        >
          
          <Tab label="online" {...a11yProps(1)} sx={{ color: theme.palette.secondary.main }} />
          <Tab label="tutto" {...a11yProps(0)} sx={{ color: theme.palette.secondary.main }} />
        </Tabs>
        </AppBar>
      
      {/* tab 1 con fq 'online' da passare come props */}
      <TabPanel 
        value={value} 
        index={0} 
        sx={{ color: theme.palette.secondary.main }} 
      >
        <SearchBar fq='online' filter='5' fields='tagfamilyall' start='0' sort='_score' ord='desc' />
      </TabPanel>
      
      {/* tab 2 con fq 'all' da passare come props */}
      <TabPanel
       value={value} 
       index={1} 
       sx={{ color: theme.palette.secondary.main }} >
        
        <SearchBar fq='all' filter='5' fields='tagfamilyall' start='0' sort='_score' ord='desc' />

      </TabPanel>
    </Paper>
  );
} else {
  return (
    <Paper elevation={4}
    square={true}
    sx={{ width: '100%', backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }}
    >
      <AppBar position="static" elevation={0} >
      <Tabs
          
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="full width tabs example"
          centered
        >
          <Tab label="tutto" {...a11yProps(0)} sx={{ color: theme.palette.secondary.main }} />
          <Tab label="online" {...a11yProps(1)} sx={{ color: theme.palette.secondary.main }} />
        </Tabs>
        </AppBar>

      <TabPanel 
        value={value} 
        index={0} 
        sx={{ color: theme.palette.secondary.main }} 
      >
        

        <SearchBar fq='all' filter='5' fields='tagfamilyall' start='0' sort='_score' ord='desc' />

      </TabPanel>
      
      <TabPanel
       value={value} 
       index={1} 
       sx={{ color: theme.palette.secondary.main }} >


        <SearchBar fq='online' filter='5' fields='tagfamilyall' start='0' sort='_score' ord='desc' />
        
      </TabPanel>
    </Paper>
  );
}


}


