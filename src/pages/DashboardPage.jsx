import React, { useState, useEffect } from 'react';
import { useShips } from '../contexts/ShipsContext';
import { useComponents } from '../contexts/ComponentsContext';
import { useJobs } from '../contexts/JobsContext';
import { useAuth } from '../contexts/AuthContext'; // Make sure to import useAuth
import { 
  Card, CardContent, Typography, Grid, Box, Button, Paper, Alert, 
  Dialog, DialogActions, DialogContent, DialogTitle, Drawer, List, 
  ListItem, ListItemText, Divider, AppBar, Toolbar, IconButton, Menu, MenuItem
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Charts from '../components/Dashboard/Charts';
import JobForm from '../components/Jobs/JobForm';
import ComponentForm from '../components/Components/ComponentForm';

const DashboardPage = () => {
  const { ships } = useShips();
  const { components } = useComponents();
  const { jobs } = useJobs();
  const { logout, user } = useAuth(); // Get logout function and user from auth context
  const navigate = useNavigate(); // Use navigate for redirection

  const gracePeriodDays = 7;
  const now = new Date();
  const overdueComponents = components.filter(c => {
    const lastDate = new Date(c.lastMaintenanceDate);
    const daysSince = (now - lastDate) / (1000 * 60 * 60 * 24);
    return daysSince > gracePeriodDays;
  }).length;

  const jobsInProgress = jobs.filter(j => j.status === 'In Progress').length;
  const jobsCompleted = jobs.filter(j => j.status === 'Completed').length;

  const [openJobDialog, setOpenJobDialog] = useState(false);
  const [openComponentDialog, setOpenComponentDialog] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  
  // User menu state
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  
  // Check authentication status
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const handleOpenJobDialog = () => setOpenJobDialog(true);
  const handleCloseJobDialog = () => setOpenJobDialog(false);
  const handleOpenComponentDialog = () => setOpenComponentDialog(true);
  const handleCloseComponentDialog = () => setOpenComponentDialog(false);
  const toggleNav = () => setOpenNav(!openNav);
  
  // User menu handlers
  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);
  
  // Notifications handlers
  const handleNotificationsOpen = (event) => setNotificationsAnchor(event.currentTarget);
  const handleNotificationsClose = () => setNotificationsAnchor(null);

  const handleLogout = () => {
    logout(); // Use the logout function from auth context
    navigate('/login'); // Redirect to login page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ship Maintenance System
          </Typography>
          
          {/* Notifications */}
          <IconButton 
            color="inherit" 
            onClick={handleNotificationsOpen}
            size="large"
          >
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
            PaperProps={{ style: { maxWidth: 300 } }}
          >
            <MenuItem disabled>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Important Alerts
              </Typography>
            </MenuItem>
            <Divider />
            {overdueComponents > 0 ? (
              <MenuItem onClick={handleNotificationsClose}>
                <Alert severity="error" sx={{ width: '100%' }}>
                  {overdueComponents} components have overdue maintenance!
                </Alert>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleNotificationsClose}>
                <Typography>No new notifications</Typography>
              </MenuItem>
            )}
          </Menu>

          {/* Display current user and role */}
          {user && (
            <Typography variant="body2" sx={{ mx: 2 }}>
              {user.email} ({user.role})
            </Typography>
          )}

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
            <MenuItem
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
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
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Log Out" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#fafafa',
          padding: '20px',
          minHeight: '100vh',
          marginTop: '64px', // Make space for the AppBar
          paddingLeft: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500, color: '#2c3e50' }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Total Ships
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {ships.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Overdue Components
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {overdueComponents}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Jobs In Progress
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {jobsInProgress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Jobs Completed
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {jobsCompleted}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ marginTop: '32px' }}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenJobDialog}
              fullWidth
              sx={{ padding: '12px', textTransform: 'none' }}
            >
              Create Job
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenComponentDialog}
              fullWidth
              sx={{ padding: '12px', textTransform: 'none' }}
            >
              Create Component
            </Button>
          </Grid>
        </Grid>

        <Paper variant="outlined" sx={{ marginTop: '32px', padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Maintenance Jobs Overview
          </Typography>
          <Charts jobs={jobs} />
        </Paper>

        <Dialog open={openJobDialog} onClose={handleCloseJobDialog} fullWidth maxWidth="md">
          <DialogTitle>Create Maintenance Job</DialogTitle>
          <DialogContent>
            <JobForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseJobDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openComponentDialog} onClose={handleCloseComponentDialog} fullWidth maxWidth="md">
          <DialogTitle>Create Component</DialogTitle>
          <DialogContent>
            <ComponentForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseComponentDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DashboardPage;