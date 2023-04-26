import React from 'react';
import {Stack, Box, ListItem, Pagination, TablePagination} from '@mui/material';

const DataPagination = (props) => {
  return (
      <Pagination 
      showFirstButton={true}
      showLastButton={true}
      count={props.count}
      color="primary" 
      size='large' 
      />
  );
}

export default DataPagination;