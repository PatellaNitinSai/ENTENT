import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import JobList from '../components/Jobs/JobList';
import {
  Typography,
  Box,
  Container,
  IconButton,
  Divider,
  Stack,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const JobsPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ship Maintenance System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Navigation Drawer */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            paddingTop: '64px', // height of AppBar
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/ships">
            <ListItemText primary="Ships" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/jobs">
            <ListItemText primary="Jobs" />
          </ListItem>
          <Divider />
          
          <Divider />
          <ListItem button component={Link} to="/logout">
            <ListItemText primary="Log Out" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#fafafa',
          padding: '20px',
          minHeight: '100vh',
          marginTop: '64px', // AppBar height
          paddingLeft: '20px',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Stack spacing={3}>
              {/* Header Section */}
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={goToDashboard} color="primary">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1" color="primary">
                  Jobs
                </Typography>
              </Box>
              <Divider sx={{ borderColor: theme.palette.divider }} />

              {/* Job List Section */}
              <Box
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  p: 2,
                }}
              >
                <JobList />
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default JobsPage;
