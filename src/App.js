// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';
import { NotificationProvider } from './components/Notifications/NotificationProvider';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import JobCalendar from './components/Jobs/JobCalendar';
import NotificationCenter from './components/Notifications/NotificationCenter';
import ShipForm from './components/Ships/ShipForm';
import ComponentListPage from './pages/ComponentListPgae';
import ComponentForm from './components/Components/ComponentForm';
import JobForm from './components/Jobs/JobForm';
import { useAuth } from './contexts/AuthContext';
const PrivateRoute = ({ element, roles }) => {
  const { user } = useAuth();
  return user && (!roles || roles.includes(user.role)) ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ShipsProvider>
          <ComponentsProvider>
            <JobsProvider>
              <Router>
                <NotificationCenter />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} roles={['Admin', 'Inspector']} />} />
                  <Route path="/ships" element={<PrivateRoute element={<ShipsPage />} roles={['Admin']} />} />
                  <Route path="/ships/new" element={<PrivateRoute element={<ShipForm />} roles={['Admin']} />} />
                  <Route path="/ships/edit/:id" element={<PrivateRoute element={<ShipForm />} roles={['Admin']} />} />
                  <Route path="/ships/:id" element={<PrivateRoute element={<ShipDetailPage />} />} />
                  <Route path="/components/new/:shipId" element={<PrivateRoute element={<ComponentForm />} roles={['Admin']} />} />
                  <Route path="/jobs" element={<PrivateRoute element={<JobsPage />} />} />
                  <Route path="/jobs/new" element={<PrivateRoute element={<JobForm />} roles={['Admin']} />} />
                  <Route path="/calendar" element={<PrivateRoute element={<JobCalendar />} />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                  <Route
  path="/components/list/:shipId"
  element={<PrivateRoute element={<ComponentListPage />} roles={['Admin', 'Inspector','Engineer']} />}
/>
                </Routes>
              </Router>
            </JobsProvider>
          </ComponentsProvider>
        </ShipsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;