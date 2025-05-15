import React, { useState } from 'react';
import { useJobs } from '../../contexts/JobsContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';

const JobCalendar = () => {
  const { jobs } = useJobs();
  const [selectedDate, setSelectedDate] = useState(null);

  const jobsByDate = jobs.reduce((acc, job) => {
    acc[job.scheduledDate] = acc[job.scheduledDate] || [];
    acc[job.scheduledDate].push(job);
    return acc;
  }, {});

  const onDateClick = (date) => {
    const formatted = date.toISOString().split('T')[0];
    setSelectedDate(formatted);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
        Maintenance Calendar
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ boxShadow: 3 }}>
          <Calendar onClickDay={onDateClick} className="calendar" />
        </Paper>
      </Box>

      {selectedDate && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Jobs on {selectedDate}
          </Typography>

          <List>
            {(jobsByDate[selectedDate] || []).map((job) => (
              <React.Fragment key={job.id}>
                <ListItem sx={{ borderBottom: '1px solid #ddd' }}>
                  <ListItemText
                    primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>{job.type}</Typography>}
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        Priority: {job.priority} | Status: {job.status}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default JobCalendar;
