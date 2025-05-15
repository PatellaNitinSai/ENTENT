import React from 'react';
import LoginForm from '../components/Authentication/LoginForm';
import { Box, Paper, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Single card container */}
      <Paper elevation={6} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        {/* LoginForm should NOT contain another Paper or Card inside it */}
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default LoginPage;
