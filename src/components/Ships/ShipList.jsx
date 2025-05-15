import React from 'react';
import { Link } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Typography, Paper } from '@mui/material';

const ShipList = () => {
  const { ships, deleteShip } = useShips();

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Ships
      </Typography>
      {/* <Link to="/ships/new">
        <Button variant="contained" color="success" style={{ marginBottom: '16px' }}>
          Add Ship
        </Button>
      </Link> */}
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>IMO Number</strong></TableCell>
              <TableCell><strong>Flag</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ships.map(ship => (
              <TableRow key={ship.id}>
                <TableCell>{ship.name}</TableCell>
                <TableCell>{ship.imo}</TableCell>
                <TableCell>{ship.flag}</TableCell>
                <TableCell>{ship.status}</TableCell>
                <TableCell>
                  <Link to={`/ships/${ship.id}`}>
                    <Button variant="outlined" color="primary" style={{ marginRight: '8px' }}>
                      View
                    </Button>
                  </Link>
                  <Link to={`/ships/edit/${ship.id}`}>
                    <Button variant="outlined" color="warning" style={{ marginRight: '8px' }}>
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => deleteShip(ship.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default ShipList;
