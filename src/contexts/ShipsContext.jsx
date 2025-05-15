import React, { createContext, useContext, useState, useEffect } from 'react';

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('ships');
    if (stored) setShips(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('ships', JSON.stringify(ships));
  }, [ships]);

  const addShip = (ship) => setShips(prev => [...prev, ship]);
  const updateShip = (id, updated) => setShips(prev => prev.map(s => s.id === id ? updated : s));
  const deleteShip = (id) => setShips(prev => prev.filter(s => s.id !== id));

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
