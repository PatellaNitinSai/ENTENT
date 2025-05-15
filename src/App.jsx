// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import JobForm from './components/Jobs/JobForm';
import ComponentForm from './components/Components/ComponentForm';
import NotificationCenter from './components/Notifications/NotificationCenter';
import { AuthProvider } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';
import { NotificationProvider } from './components/Notifications/NotificationProvider';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <ShipsProvider>
            <ComponentsProvider>
              <JobsProvider>
                <NotificationCenter />
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/ships" element={<ShipsPage />} />
                  <Route path="/ships/:id" element={<ShipDetailPage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/jobs/new" element={<JobForm />} />
                  <Route path="/components/new" element={<ComponentForm />} />
                </Routes>
              </JobsProvider>
            </ComponentsProvider>
          </ShipsProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
