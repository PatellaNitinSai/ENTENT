import React, { createContext, useContext, useState, useEffect } from 'react';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('jobs');
    if (stored) setJobs(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => setJobs(prev => [...prev, job]);
  const updateJob = (id, updated) => setJobs(prev => prev.map(j => j.id === id ? updated : j));
  const deleteJob = (id) => setJobs(prev => prev.filter(j => j.id !== id));

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
