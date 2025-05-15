import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ComponentList = ({ components, shipId }) => {
  // Filter components by shipId
  const filteredComponents = components.filter((component) => component.shipId === shipId);

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>Components for Ship {shipId}</Typography>
      {filteredComponents.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Install Date</TableCell>
              <TableCell>Last Maintenance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComponents.map((component) => (
              <TableRow key={component.id}>
                <TableCell>{component.name}</TableCell>
                <TableCell>{component.serialNumber}</TableCell>
                <TableCell>{component.installDate}</TableCell>
                <TableCell>{component.lastMaintenanceDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No components found for this ship</Typography>
      )}
    </Paper>
  );
};

export default ComponentList;
