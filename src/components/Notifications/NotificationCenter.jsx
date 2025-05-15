import React from 'react';
import { useNotification } from './NotificationProvider';

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map(n => (
        <div key={n.id} className={`p-3 rounded shadow text-white ${n.type === 'success' ? 'bg-green-500' : n.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
          <div className="flex justify-between items-center">
            <span>{n.message}</span>
            <button onClick={() => dismissNotification(n.id)} className="ml-4">✖</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;