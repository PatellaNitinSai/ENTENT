import React from 'react';

const KPICards = ({ totalShips, overdueComponents, jobsInProgress, jobsCompleted }) => {
  const cards = [
    { label: 'Total Ships', value: totalShips, color: 'bg-blue-500' },
    { label: 'Overdue Components', value: overdueComponents, color: 'bg-red-500' },
    { label: 'Jobs In Progress', value: jobsInProgress, color: 'bg-yellow-500' },
    { label: 'Jobs Completed', value: jobsCompleted, color: 'bg-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className={`p-6 text-white rounded shadow ${card.color}`}>
          <h3 className="text-lg font-semibold">{card.label}</h3>
          <p className="text-2xl mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
