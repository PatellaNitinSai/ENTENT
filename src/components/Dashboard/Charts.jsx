import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Charts = ({ jobs }) => {
  const data = ['Open', 'In Progress', 'Completed'].map(status => ({
    name: status,
    count: jobs.filter(j => j.status === status).length,
  }));

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Job Status Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
