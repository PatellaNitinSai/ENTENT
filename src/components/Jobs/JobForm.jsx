import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { useShips } from '../../contexts/ShipsContext';
import {
  TextField, Button, Select, MenuItem, InputLabel,
  FormControl, Box, Typography
} from '@mui/material';

const JobForm = () => {
  const { addJob } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();
  const [formData, setFormData] = useState({
    type: '', priority: '', status: 'Open', shipId: '',
    componentId: '', assignedEngineerId: '', scheduledDate: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.shipId || !formData.componentId) {
      alert("Please select a valid ship and component");
      return;
    }
    addJob({ ...formData, id: `j${Date.now()}` });
    navigate('/jobs');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Create Job</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Ship</InputLabel>
        <Select
          value={formData.shipId}
          onChange={e => setFormData({ ...formData, shipId: e.target.value, componentId: '' })}
          label="Ship"
        >
          <MenuItem value="">Select Ship</MenuItem>
          {ships.map(ship => (
            <MenuItem key={ship.id} value={ship.id}>{ship.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }} disabled={!formData.shipId}>
        <InputLabel>Component</InputLabel>
        <Select
          value={formData.componentId}
          onChange={e => setFormData({ ...formData, componentId: e.target.value })}
          label="Component"
        >
          <MenuItem value="">Select Component</MenuItem>
          {components
            .filter(c => c.shipId === formData.shipId)
            .map(c => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField label="Type" fullWidth sx={{ mb: 2 }} value={formData.type}
        onChange={e => setFormData({ ...formData, type: e.target.value })} />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={formData.priority}
          onChange={e => setFormData({ ...formData, priority: e.target.value })}
          label="Priority"
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Engineer ID" fullWidth sx={{ mb: 2 }}
        value={formData.assignedEngineerId}
        onChange={e => setFormData({ ...formData, assignedEngineerId: e.target.value })} />

      <TextField label="Scheduled Date" type="date" fullWidth sx={{ mb: 2 }}
        value={formData.scheduledDate}
        onChange={e => setFormData({ ...formData, scheduledDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />

      <Button type="submit" variant="contained" fullWidth>Create</Button>
    </Box>
  );
};

export default JobForm;
