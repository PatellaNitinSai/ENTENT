import React, { useState, useEffect } from 'react';
import { useShips } from '../../contexts/ShipsContext';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  MenuItem,
  InputAdornment,
  Divider,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormHelperText,
  FormControl,
  Select,
  InputLabel,
  Chip,
  Snackbar,
  Alert,
  Paper
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  DirectionsBoat as ShipIcon,
  Flag as FlagIcon,
  Numbers as ImoIcon,
  Circle as StatusIcon
} from '@mui/icons-material';

const ShipForm = ({ id, onClose, onSave }) => {
  const { ships, addShip, updateShip } = useShips();
  const editMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'success' },
    { value: 'maintenance', label: 'Under Maintenance', color: 'warning' },
    { value: 'retired', label: 'Retired', color: 'error' },
    { value: 'docked', label: 'Docked', color: 'info' }
  ];

  const flagOptions = [
    { value: 'panama', label: 'Panama' },
    { value: 'liberia', label: 'Liberia' },
    { value: 'marshall islands', label: 'Marshall Islands' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'hong kong', label: 'Hong Kong' },
    { value: 'malta', label: 'Malta' },
    { value: 'bahamas', label: 'Bahamas' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (editMode) {
      const ship = ships.find(s => s.id === id);
      if (ship) setFormData(ship);
    }
  }, [id, ships, editMode]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Ship name is required';
    if (!formData.imo.trim()) {
      newErrors.imo = 'IMO number is required';
    } else if (!/^\d{7}$/.test(formData.imo)) {
      newErrors.imo = 'IMO number must be 7 digits';
    }
    if (!formData.flag.trim()) newErrors.flag = 'Flag country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editMode) {
      updateShip(id, formData);
    } else {
      addShip({ ...formData, id: `s${Date.now()}` });
    }

    setShowSuccess(true);
    setTimeout(() => {
      if (onSave) onSave(formData);
      if (onClose) onClose();
    }, 1000);
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : 'default';
  };

  return (
    <>
      <DialogTitle sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 3,
        py: 2
      }}>
        <ShipIcon />
        <Typography variant="h6">
          {editMode ? 'Edit Ship Details' : 'Register New Ship'}
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Box component="form" id="ship-form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Ship Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                size="small"
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ShipIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="IMO Number"
                value={formData.imo}
                onChange={e => setFormData({ ...formData, imo: e.target.value })}
                fullWidth
                size="small"
                error={!!errors.imo}
                helperText={errors.imo || "7-digit IMO number"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImoIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" error={!!errors.flag}>
                <InputLabel id="flag-select-label">Flag Country</InputLabel>
                <Select
                  labelId="flag-select-label"
                  value={formData.flag}
                  onChange={e => setFormData({ ...formData, flag: e.target.value })}
                  label="Flag Country"
                  startAdornment={
                    <InputAdornment position="start">
                      <FlagIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  }
                  MenuProps={{ PaperProps: { style: { maxHeight: 224 } } }}
                >
                  {flagOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.flag && <FormHelperText>{errors.flag}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-select-label">Operational Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  label="Operational Status"
                  startAdornment={
                    <InputAdornment position="start">
                      <StatusIcon fontSize="small" color={getStatusColor(formData.status)} />
                    </InputAdornment>
                  }
                  renderValue={(selected) => {
                    const option = statusOptions.find(opt => opt.value === selected);
                    return (
                      <Chip
                        size="small"
                        label={option?.label}
                        color={option?.color}
                        sx={{ height: 24 }}
                      />
                    );
                  }}
                  MenuProps={{ PaperProps: { style: { maxHeight: 224 } } }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StatusIcon fontSize="small" color={option.color} />
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={onClose}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="ship-form"
          variant="contained"
          startIcon={<SaveIcon />}
        >
          {editMode ? 'Update' : 'Save'}
        </Button>
      </DialogActions>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Ship successfully {editMode ? 'updated' : 'registered'}!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShipForm;
