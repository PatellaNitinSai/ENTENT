// File: src/pages/ComponentListPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ComponentList from '../components/Components/ComponentList';

const ComponentListPage = () => {
  const { shipId } = useParams();

  return (
    <div>
      <h2>Component List for Ship {shipId}</h2>
      <ComponentList shipId={shipId} />
    </div>
  );
};

export default ComponentListPage;
