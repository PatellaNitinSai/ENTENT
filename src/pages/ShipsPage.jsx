import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Fab,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useComponents } from '../contexts/ComponentsContext';

const ShipsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { components } = useComponents();
  
  // State
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Calculate overdue components
  const gracePeriodDays = 7;
  const now = new Date();
  const overdueComponents = components ? components.filter(c => {
    const lastDate = new Date(c.lastMaintenanceDate);
    const daysSince = (now - lastDate) / (1000 * 60 * 60 * 24);
    return daysSince > gracePeriodDays;
  }).length : 0;
  
  // Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShipAdded = () => {
    setReload(!reload);
    setSnackbar({
      open: true,
      message: 'Ship added successfully!',
      severity: 'success'
    });
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };
  
  // User menu handlers
  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);
  
  // Notifications handlers
  const handleNotificationsOpen = (event) => setNotificationsAnchor(event.currentTarget);
  const handleNotificationsClose = () => setNotificationsAnchor(null);

  const handleAddShip = (shipData) => {
    console.log('Adding new ship:', shipData);
    // Here you would typically make an API call to save the ship
    handleShipAdded();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ship Maintenance System
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationsOpen} size="large">
            <NotificationsIcon />
            {overdueComponents > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: 'error.main',
                  display: 'flex',
                  justifyContent: 'center',
                  gap:'100px',
                  alignItems: 'center',
                  fontSize: '0.6rem',
                }}
              >
                {overdueComponents}
              </Box>
            )}
          </IconButton>
          <Menu
            anchorEl={notificationsAnchor}
            open={Boolean(notificationsAnchor)}
            onClose={handleNotificationsClose}
          >
            {overdueComponents > 0 ? (
              <MenuItem onClick={handleNotificationsClose}>
                {overdueComponents} components have overdue maintenance
              </MenuItem>
            ) : (
              <MenuItem onClick={handleNotificationsClose}>
                No new notifications
              </MenuItem>
            )}
          </Menu>
          <IconButton color="inherit" onClick={handleUserMenuOpen} size="large">
            <AccountCircleIcon />
          </IconButton>
          <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={handleUserMenuClose}>
            <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
            <Divider />
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
            paddingTop: '64px',
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
          marginTop: '64px',
          paddingLeft: '20px',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Stack spacing={3}>
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={goToDashboard} color="primary">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1" color="primary">
                  Ships List
                </Typography>
              </Box>
              <Divider sx={{ borderColor: theme.palette.divider }} />
              <Box sx={{ borderRadius: 2, backgroundColor: theme.palette.background.paper, padding: 2, border: `1px solid ${theme.palette.divider}` }}>
                <ShipList reload={reload} />
              </Box>
            </Stack>
          </Box>
        </Container>

        {/* Floating Action Button for Adding Ships */}
        <Fab
          color="primary"
          aria-label="add ship"
          onClick={handleOpen}
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
        >
          <AddIcon />
        </Fab>

        {/* Add Ship Dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Add New Ship</DialogTitle>
          <DialogContent>
            <ShipForm onSubmit={handleAddShip} onSuccess={handleShipAdded} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ShipsPage;
