import React, { useState } from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { useShips } from '../../contexts/ShipsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import {
  Box, Typography, Button, Select, MenuItem, FormControl,
  InputLabel, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';

const JobList = () => {
  const { jobs, updateJob, deleteJob } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();
  const [filter, setFilter] = useState({ shipId: '', status: '', priority: '' });

  const filteredJobs = jobs.filter(job =>
    (!filter.shipId || job.shipId === filter.shipId) &&
    (!filter.status || job.status === filter.status) &&
    (!filter.priority || job.priority === filter.priority)
  );

  const changeStatus = (id, newStatus) => {
    const job = jobs.find(j => j.id === id);
    if (job) updateJob(id, { ...job, status: newStatus });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>Maintenance Jobs</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Ship</InputLabel>
          <Select
            value={filter.shipId}
            onChange={e => setFilter({ ...filter, shipId: e.target.value })}
            label="Ship"
          >
            <MenuItem value="">All Ships</MenuItem>
            {ships.map(ship => (
              <MenuItem key={ship.id} value={ship.id}>{ship.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter.status}
            onChange={e => setFilter({ ...filter, status: e.target.value })}
            label="Status"
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filter.priority}
            onChange={e => setFilter({ ...filter, priority: e.target.value })}
            label="Priority"
          >
            <MenuItem value="">All Priority</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ship</TableCell>
              <TableCell>Component</TableCell>
              <TableCell>Engineer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map(job => {
              const ship = ships.find(s => s.id === job.shipId);
              const component = components.find(c => c.id === job.componentId);
              return (
                <TableRow key={job.id}>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.priority}</TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell>{ship?.name || '-'}</TableCell>
                  <TableCell>{component?.name || '-'}</TableCell>
                  <TableCell>{job.assignedEngineerId}</TableCell>
                  <TableCell>{job.scheduledDate}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => changeStatus(job.id, 'In Progress')}>Start</Button>
                    <Button size="small" onClick={() => changeStatus(job.id, 'Completed')}>Complete</Button>
                    <Button size="small" color="error" onClick={() => deleteJob(job.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JobList;

