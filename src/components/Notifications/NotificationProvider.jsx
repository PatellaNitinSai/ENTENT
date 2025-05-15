// File: src/components/Notifications/NotificationProvider.jsx
import React, { useReducer, useContext, createContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { id: Date.now(), ...action.payload }];
    case 'DISMISS_NOTIFICATION':
      return state.filter(n => n.id !== action.payload);
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = (type, message) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type, message } });
  };

  const dismissNotification = (id) => {
    dispatch({ type: 'DISMISS_NOTIFICATION', payload: id });
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, dismissNotification }}>
      {children}

      {/* Render notifications using Snackbar */}
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={6000}  // Hide after 6 seconds
          onClose={() => dismissNotification(notification.id)}  // Dismiss on close
        >
          <Alert
            onClose={() => dismissNotification(notification.id)}  // Close notification
            severity={notification.type}  // 'error', 'success', 'info', 'warning'
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
