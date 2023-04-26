import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Container } from '@mui/system';

export default function LoadingSpinner() {
  return (
    <Container maxWidth="xl">
    <Box sx={{ 
        width: 'auto',
        marginY: '3rem',
        }}>
      <LinearProgress />
    </Box>
    </Container>
  );
}