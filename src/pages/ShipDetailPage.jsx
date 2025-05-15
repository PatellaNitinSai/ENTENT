import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShipDetail from '../components/Ships/ShipDetail';
import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  Divider as MuiDivider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const ShipDetailPage = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const goBack = () => {
    navigate('/ships'); // Assuming '/ships' is the route for the Ship List page
  };

  // State for menu anchors (User Menu)
  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);
  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ship Maintenance System
          </Typography>
          
          {/* User Menu */}
          <IconButton
            color="inherit"
            onClick={handleUserMenuOpen}
            size="large"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
            <MuiDivider />
            <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Side Nav */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            paddingTop: '64px', // Make space for the AppBar
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <MuiDivider />
          <ListItem button onClick={() => navigate('/ships')}>
            <ListItemText primary="Ships" />
          </ListItem>
          <MuiDivider />
          <ListItem button onClick={() => navigate('/jobs')}>
            <ListItemText primary="Jobs" />
          </ListItem>
          <MuiDivider />
          <ListItem button onClick={() => navigate('/logout')}>
            <ListItemText primary="Log Out" />
          </ListItem>
          <MuiDivider />
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
          marginTop: '64px', // Make space for the AppBar
          paddingLeft: '20px',
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ py: 4 }}>
            <Stack spacing={3}>
              {/* Header Section with Back Button */}
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={goBack} color="primary">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1" gutterBottom>
                  Ship Details
                </Typography>
              </Box>

              <Divider />

              {/* ShipDetail Section */}
              <Box sx={{ p: 3, border: '1px solid #ddd' }}>
                <ShipDetail />
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ShipDetailPage;
