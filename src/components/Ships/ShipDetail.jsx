import React from 'react';
import { useParams } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import { Typography, Paper, Divider, Box } from '@mui/material';

const ShipDetail = () => {
  const { id } = useParams();
  const { ships } = useShips();
  const ship = ships.find(s => s.id === id);

  if (!ship) return (
    <Box p={4}>
      <Typography variant="h6" color="error">
        Ship not found.
      </Typography>
    </Box>
  );

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {ship.name}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Typography variant="body1" gutterBottom>
          <strong>IMO Number:</strong> {ship.imo}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Flag:</strong> {ship.flag}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Status:</strong> {ship.status}
        </Typography>

        {/* You can add additional sections for Maintenance and Components if needed */}
      </Paper>
    </Box>
  );
};

export default ShipDetail;
