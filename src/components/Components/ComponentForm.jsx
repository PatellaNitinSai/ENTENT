import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useComponents } from '../../contexts/ComponentsContext';
import { useShips } from '../../contexts/ShipsContext';
import {
  TextField, Button, Box, Typography, Grid, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';

const ComponentForm = ({ shipId: propShipId, onClose }) => {
  const { components, addComponent, updateComponent } = useComponents();
  const { ships } = useShips();
  const { id } = useParams();
  const navigate = useNavigate();
  const editMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: '',
    shipId: propShipId || ''
  });

  useEffect(() => {
    if (editMode) {
      const existing = components.find(c => c.id === id);
      if (existing) setFormData(existing);
    }
  }, [id, components, editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, serialNumber, installDate, lastMaintenanceDate, shipId } = formData;

    if (!name || !serialNumber || !installDate || !lastMaintenanceDate || !shipId) {
      alert('All fields must be filled.');
      return;
    }

    const newComponent = { ...formData, id: `c${Date.now()}` };
    editMode ? updateComponent(id, newComponent) : addComponent(newComponent);

    onClose ? onClose() : navigate(-1);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {editMode ? 'Edit Component' : 'Add Component'}
      </Typography>

      <Grid container spacing={2}>
        {!propShipId && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Ship</InputLabel>
              <Select
                value={formData.shipId}
                label="Select Ship"
                onChange={(e) => setFormData({ ...formData, shipId: e.target.value })}
              >
                {ships.map(ship => (
                  <MenuItem key={ship.id} value={ship.id}>{ship.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        {['name', 'serialNumber', 'installDate', 'lastMaintenanceDate'].map((field) => (
          <Grid item xs={12} key={field}>
            <TextField
              label={field.replace(/([A-Z])/g, ' $1')}
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              fullWidth
              variant="outlined"
              type={field.includes('Date') ? 'date' : 'text'}
              InputLabelProps={field.includes('Date') ? { shrink: true } : {}}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.2 }}>
          {editMode ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};

export default ComponentForm;
